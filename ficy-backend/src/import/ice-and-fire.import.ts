import axios from "axios";
import mongoose from "mongoose";
import { Book } from "../models/book.model";
import { House } from "../models/house.model";
import { Character } from "../models/character.model";

const API_BASE_URL = "https://anapioficeandfire.com/api";

async function fetchAllData(endpoint: string): Promise<any[]> {
  let allData: any[] = [];
  let page = 1;
  const pageSize = 50;
  while (true) {
    console.log(`Fetching ${endpoint} - page ${page}...`);
    const url = `${API_BASE_URL}/${endpoint}?page=${page}&pageSize=${pageSize}`;
    const response = await axios.get(url);
    const data = response.data;
    if (data.length === 0) {
      break;
    }
    allData = allData.concat(data);
    console.log(`Fetched ${data.length} items from page ${page}.`);
    page++;
  }
  console.log(`Total ${allData.length} ${endpoint} fetched.`);
  return allData;
}

async function upsertData(model: mongoose.Model<any>, data: any[]) {
  for (const item of data) {
    const filter = { url: item.url };
    await model.updateOne(filter, { $set: item }, { upsert: true });
  }
  console.log(
    `Upserted ${data.length} items into ${model.collection.collectionName}.`
  );
}

export async function fetchAndDumpDataFromApi() {
  const [books, houses, characters] = await Promise.all([
    fetchAllData("books"),
    fetchAllData("houses"),
    fetchAllData("characters"),
  ]);

  await upsertData(Book, books);
  await upsertData(House, houses);
  await upsertData(Character, characters);

  console.log("All data fetched and stored successfully.");
}
