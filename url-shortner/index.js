import { createServer } from "http";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_FILE = path.join("data", "allLinks.json");

const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 page not found");
  }
};

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return data ? JSON.parse(data) : {};
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links, null, 2));
};

const app = createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(res, path.join("public", "index.html"), "text/html");
    } else if (req.url === "/style.css") {
      return serveFile(res, path.join("public", "style.css"), "text/css");
    } else if (req.url === "/script.js") {
      return serveFile(res, path.join("public", "script.js"), "application/javascript");
    } else if (req.url === "/links") {
      const links = await loadLinks();
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    }
    else{
      const links = await loadLinks();
      const shortCode = req.url.slice(1);

      if (links[shortCode]) {
        res.writeHead(302, { location: links[shortCode] });
        return res.end();
      }

      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Shortened URL is not found");
    

    }
  }

  if (req.method === "POST" && req.url === "/short") {
    const links = await loadLinks();

    let chunks = "";
    req.on("data", (chunk) => {
      chunks += chunk;
    });

    req.on("end", async () => {
      const body = JSON.parse(chunks);
      const { urlInput, codeInput } = body;

      if (!urlInput) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("URL is required");
      }

      const finalShortCode = codeInput || crypto.randomBytes(4).toString("hex");

      if (links[finalShortCode]) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Short URL already exists");
      }

      links[finalShortCode] = urlInput;

      await saveLinks(links);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ shortUrl: finalShortCode }));
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
