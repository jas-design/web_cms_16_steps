import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const PORT = 3000;

async function startServer() {
  const app = express();

  // High-fidelity payload limit for image uploads and rich pages
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Dynamic directory structures
  const contentDir = path.join(process.cwd(), "src", "content", "pages");
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  // Ensure directories exist
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  } catch (err) {
    console.error("Failed to safely create directory structures:", err);
  }

  // 1. Schema List & Page Content Loader
  app.get("/api/cms/pages", (req, res) => {
    try {
      const files = ["home.json", "about.json", "services.json", "faq.json", "contact.json", "navigation.json"];
      const data: Record<string, any> = {};

      files.forEach((file) => {
        const filePath = path.join(contentDir, file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, "utf-8");
          data[file.replace(".json", "")] = JSON.parse(content);
        } else {
          data[file.replace(".json", "")] = {};
        }
      });

      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 2. Page Content Writer
  app.post("/api/cms/pages/:pageId", (req, res) => {
    try {
      const { pageId } = req.params;
      const payload = req.body;

      const validFiles = ["home", "about", "services", "faq", "contact", "navigation"];
      if (!validFiles.includes(pageId)) {
        return res.status(400).json({ success: false, error: "Invalid content domain identifier" });
      }

      const filePath = path.join(contentDir, `${pageId}.json`);
      fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf-8");

      console.log(`[CMS] Successfully saved page config to file: ${filePath}`);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 3. Media Portfolio Lister
  app.get("/api/cms/media", (req, res) => {
    try {
      const curatedStock = [
        {
          name: "dermal-serum-bottle.jpg",
          url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600",
          alt: "Clean botanical serum bottle in glass container",
          size: "142 KB"
        },
        {
          name: "laboratory-herbal-oil.jpg",
          url: "https://images.unsplash.com/photo-1556228515-3198ece1c440?auto=format&fit=crop&q=80&w=600",
          alt: "Clinical research setting with active botanicals",
          size: "210 KB"
        },
        {
          name: "skincare-treatment-patient.jpg",
          url: "https://images.unsplash.com/photo-1556228515-3198ece1c440?auto=format&fit=crop&q=80&w=600",
          alt: "Therapeutic recovery consultation",
          size: "340 KB"
        },
        {
          name: "cosmetic-mineral-mud.jpg",
          url: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?auto=format&fit=crop&q=80&w=600",
          alt: "Pure minerals dynamic paste",
          size: "185 KB"
        }
      ];

      let uploads: any[] = [];
      if (fs.existsSync(uploadDir)) {
        const files = fs.readdirSync(uploadDir);
        uploads = files.map((file) => {
          const stats = fs.statSync(path.join(uploadDir, file));
          return {
            name: file,
            url: `/uploads/${file}`,
            alt: `Uploaded asset: ${file}`,
            size: `${Math.round(stats.size / 1024)} KB`
          };
        });
      }

      res.json({
        success: true,
        data: {
          stock: curatedStock,
          uploads: uploads
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 4. File Upload (Base64)
  app.post("/api/cms/upload", (req, res) => {
    try {
      const { filename, base64Data } = req.body;
      if (!filename || !base64Data) {
        return res.status(400).json({ success: false, error: "Filename and base64Data are required" });
      }

      // Strip out the base64 MIME-type prefix if present
      const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(cleanBase64, "base64");

      // Verify and sanitize filename to prevent path traversal
      const sanitizedFilename = path.basename(filename).replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const targetPath = path.join(uploadDir, sanitizedFilename);

      fs.writeFileSync(targetPath, buffer);
      console.log(`[CMS] Media saved locally: ${targetPath}`);

      res.json({
        success: true,
        data: {
          name: sanitizedFilename,
          url: `/uploads/${sanitizedFilename}`,
          alt: sanitizedFilename,
          size: `${Math.round(buffer.length / 1024)} KB`
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // 5. Dynamic SEO Sitemap & Robots endpoints (Elements 7 & 8)
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    const protocol = req.secure ? "https" : "http";
    const host = req.headers.host || `localhost:${PORT}`;
    res.send(`User-agent: *\nAllow: /\nSitemap: ${protocol}://${host}/sitemap.xml`);
  });

  app.get("/sitemap.xml", (req, res) => {
    try {
      res.type("application/xml");
      const protocol = req.secure ? "https" : "http";
      const host = req.headers.host || `localhost:${PORT}`;
      const baseUrl = `${protocol}://${host}`;
      
      const routes = ["", "about", "services", "faq", "contact"];
      const xmlItems = routes.map((route) => {
        const pathSuffix = route ? `#${route}` : "";
        return `  <url>
    <loc>${baseUrl}/${pathSuffix}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`;
      });

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems.join("\n")}
</urlset>`;

      res.send(sitemapXml);
    } catch (e: any) {
      res.status(500).send(`<error>${e.message}</error>`);
    }
  });

  // Client Static File Serves & Single Page Routing Fallback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      try {
        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          let html = fs.readFileSync(indexPath, "utf-8");

          // Intercept request path is standard SEO crawling paths
          const pathname = req.path.replace(/^\/|\/$/g, ""); // normalizes "/about" to "about"
          let pageName = "home";
          if (["about", "services", "faq", "contact"].includes(pathname)) {
            pageName = pathname;
          }

          let pageSeo = {
            title: "Cutisure | Pure Dermatological Skincare Solutions",
            description: "Discover medical-grade, organic dermaceutical therapies formulated under direct clinical supervision to protect and restore skin longevity.",
            keywords: "organic dermatology, clinical skincare, pore cleanse, moisture dermal therapy"
          };

          const pageJsonPath = path.join(contentDir, `${pageName}.json`);
          if (fs.existsSync(pageJsonPath)) {
            const pageData = JSON.parse(fs.readFileSync(pageJsonPath, "utf-8"));
            if (pageData.seo) {
              const seo = pageData.seo;
              pageSeo.title = seo.title || pageSeo.title;
              pageSeo.description = seo.description || pageSeo.description;
              if (Array.isArray(seo.keywords)) {
                pageSeo.keywords = seo.keywords.join(", ");
              } else if (seo.keywords) {
                pageSeo.keywords = seo.keywords;
              }
            }
          }

          // Inject customized metadata tags inside index.html for high-performance indexing
          const ogTags = `
    <meta name="description" content="${pageSeo.description}" />
    <meta name="keywords" content="${pageSeo.keywords}" />
    <meta property="og:title" content="${pageSeo.title}" />
    <meta property="og:description" content="${pageSeo.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${req.protocol}://${req.headers.host || ''}${req.originalUrl}" />
    <meta property="og:image" content="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageSeo.title}" />
    <meta name="twitter:description" content="${pageSeo.description}" />
    <meta name="twitter:image" content="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600" />
          `;

          html = html.replace("<title>My Google AI Studio App</title>", `<title>${pageSeo.title}</title>`);
          // Fail-safe title replaces if original changed
          if (!html.includes(`<title>${pageSeo.title}</title>`)) {
            html = html.replace(/<title>.*?<\/title>/, `<title>${pageSeo.title}</title>`);
          }

          html = html.replace("</head>", `${ogTags}\n</head>`);
          res.send(html);
        } else {
          res.sendStatus(404);
        }
      } catch (err: any) {
        console.error("[PRE-RENDER-META-INJECTION] Failed to inject dynamic metadata:", err);
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[CMS SERVER] Running on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
