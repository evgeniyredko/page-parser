function parseMeta() {
  const title =
    document.querySelector("title")?.textContent.split("—")[0].trim() || "";
  const description =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.trim() || "";
  const keywordsRaw =
    document.querySelector('meta[name="keywords"]')?.getAttribute("content") ||
    "";
  const keywords = keywordsRaw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  const language = document.documentElement.lang;

  const opengraph = {};
  document.querySelectorAll('meta[property^="og:"]').forEach((tag) => {
    const property = tag.getAttribute("property");
    const content = tag.getAttribute("content");
    if (property && content) {
      const key = property.replace("og:", "").trim();
      opengraph[key] = content.trim();
    }
  });
  if (opengraph.title) {
    opengraph.title = opengraph.title.split("—")[0].trim();
  }

  return {
    title,
    description,
    keywords,
    language,
    opengraph,
  };
}

function parseProduct() {
  const products = [];
  const id = document.querySelector(".product").getAttribute("data-id");
  const name = document.querySelector(".title").textContent;
  const isLiked = document.querySelector(".like").classList.contains("active");
  const tags = {
    category: [],
    label: [],
    discount: [],
  };
  document.querySelectorAll(".tags span").forEach((tag) => {
    const color = tag.className;
    const content = tag.textContent.trim();
    if (color && content) {
      if (color === "green") tags.category.push(content);
      if (color === "blue") tags.label.push(content);
      if (color === "red") tags.discount.push(content);
    }
  });
  const priceText = document
    .querySelector(".price")
    .childNodes[0].textContent.trim();
  const oldPriceText = document.querySelector(".price span").textContent.trim();
  const currencySymbol = priceText[0];
  const currency =
    currencySymbol === "₽" ? "RUB" : currencySymbol === "$" ? "USD" : "EUR";
  const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
  const oldPrice = parseFloat(oldPriceText.replace(/[^\d.]/g, ""));
  const discount = oldPrice - price;
  const discountPercent = ((discount / oldPrice) * 100).toFixed(2) + "%";
  const properties = {};
  document.querySelectorAll(".properties li").forEach((propertie) => {
    const key = propertie.querySelector("span:first-child").textContent;
    const value = propertie.querySelector("span:nth-child(2)").textContent;
    if (key && value) {
      properties[key] = value;
    }
  });

  function cleanAttributes(element) {
    const clone = element.cloneNode(true);
    clone
      .querySelectorAll("*")
      .forEach((el) =>
        [...el.attributes].forEach((attr) => el.removeAttribute(attr.name))
      );
    return clone.innerHTML.trim();
  }

  const description = cleanAttributes(document.querySelector(".description"));

  const images = [];
  document.querySelectorAll(".preview nav button").forEach((image) => {
    const img = image.querySelector("img");
    const preview = img?.getAttribute("src");
    const full = img?.getAttribute("data-src");
    const alt = img?.getAttribute("alt");
    if (preview && full && alt) {
      images.push({ preview, full, alt });
    }
  });

  return {
    id,
    name,
    isLiked,
    tags,
    price,
    oldPrice,
    discount,
    discountPercent,
    currency,
    properties,
    description,
    images,
  };
}

function parseSuggested() {
  const suggested = [];

  document.querySelectorAll(".suggested .items article").forEach((article) => {
    const name = article.querySelector("h3")?.textContent.trim() || "";
    const description = article.querySelector("p")?.textContent.trim() || "";
    const image = article.querySelector("img")?.getAttribute("src") || "";

    const priceText = article.querySelector("b")?.textContent.trim() || "";
    const currencySymbol = priceText[0];
    const currencyMap = { "₽": "RUB", $: "USD", "€": "EUR" };
    const currency = currencyMap[currencySymbol] || "UNKNOWN";
    const price = priceText.replace(/[^\d]/g, "");

    suggested.push({
      name,
      description,
      image,
      price,
      currency,
    });
  });

  return suggested;
}

function parseReviews() {
  const reviews = [];

  document.querySelectorAll(".reviews .items article").forEach((article) => {
    const rating = article.querySelectorAll(".rating .filled").length;

    const title = article.querySelector("h3.title")?.textContent.trim() || "";
    const description = article.querySelector("p")?.textContent.trim() || "";

    const avatar =
      article.querySelector(".author img")?.getAttribute("src") || "";
    const name =
      article.querySelector(".author span")?.textContent.trim() || "";

    let rawDate = article.querySelector(".author i")?.textContent || "";
    rawDate = rawDate
      .normalize("NFKC")
      .replace(/[\u200E\u200F]/g, "")
      .trim();
    const date = rawDate.replace(/\//g, "."); // ← заменяем слэши на точки

    reviews.push({
      rating,
      author: {
        avatar,
        name,
      },
      title,
      description,
      date,
    });
  });

  return reviews;
}

function parsePage() {
  return {
    meta: parseMeta(),
    product: parseProduct(),
    suggested: parseSuggested(),
    reviews: parseReviews(),
  };
}

window.parsePage = parsePage;
