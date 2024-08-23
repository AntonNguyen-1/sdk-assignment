import express from "express";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import "dotenv/config";
import cors from "cors";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.CLIENT_ID,
      "PLAID-SECRET": process.env.SANDBOX_SECRET_KEY,
    },
  },
});
const plaidClient = new PlaidApi(configuration);

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.get("/institutions/search", async (req, res) => {
  const { query, country_codes, products, options } = req.query;

  const countryCodesArray = Array.isArray(country_codes)
    ? country_codes
    : [country_codes];

  const productsArray = Array.isArray(products) ? products : [products];

  if (countryCodesArray.length === 0) {
    return res
      .status(400)
      .json({ error: "country_codes must contain at least one country code" });
  }
  try {
    const response = await plaidClient.institutionsSearch({
      query,
      country_codes: countryCodesArray,
      products: productsArray,
      options,
    });
    res.send(response.data);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
