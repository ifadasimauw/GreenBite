import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap } from "azle";
import express from "express";
import { time } from "azle";

/**
 * Representasi langganan makanan sehat.
 */
class Subscription {
  id: string;
  customerName: string;
  packageName: string;
  price: number;
  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
}

/**
 * Penyimpanan data menggunakan StableBTreeMap untuk memastikan data tetap ada setelah pembaruan canister.
 */
const subscriptionStorage = StableBTreeMap<string, Subscription>(0);

const app = express();
app.use(express.json());

/**
 * Endpoint untuk menambahkan langganan baru.
 */
app.post("/subscriptions", (req, res) => {
  const subscription: Subscription = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    updatedAt: null,
    endDate: null,
    ...req.body,
  };
  subscriptionStorage.insert(subscription.id, subscription);
  res.json(subscription);
});

/**
 * Endpoint untuk mendapatkan semua langganan.
 */
app.get("/subscriptions", (req, res) => {
  res.json(subscriptionStorage.values());
});

/**
 * Endpoint untuk mendapatkan langganan berdasarkan ID.
 */
app.get("/subscriptions/:id", (req, res) => {
  const subscriptionId = req.params.id;
  const subscriptionOpt = subscriptionStorage.get(subscriptionId);
  if (!subscriptionOpt) {
    res.status(404).send(`Langganan dengan ID=${subscriptionId} tidak ditemukan`);
  } else {
    res.json(subscriptionOpt);
  }
});

/**
 * Endpoint untuk memperbarui langganan.
 */
app.put("/subscriptions/:id", (req, res) => {
  const subscriptionId = req.params.id;
  const subscriptionOpt = subscriptionStorage.get(subscriptionId);
  if (!subscriptionOpt) {
    res
      .status(400)
      .send(`Tidak dapat memperbarui langganan dengan ID=${subscriptionId}. Langganan tidak ditemukan.`);
  } else {
    const subscription = subscriptionOpt;

    const updatedSubscription = {
      ...subscription,
      ...req.body,
      updatedAt: getCurrentDate(),
    };
    subscriptionStorage.insert(subscription.id, updatedSubscription);
    res.json(updatedSubscription);
  }
});

/**
 * Endpoint untuk menghapus langganan.
 */
app.delete("/subscriptions/:id", (req, res) => {
  const subscriptionId = req.params.id;
  const deletedSubscription = subscriptionStorage.remove(subscriptionId);
  if (!deletedSubscription) {
    res
      .status(400)
      .send(`Tidak dapat menghapus langganan dengan ID=${subscriptionId}. Langganan tidak ditemukan.`);
  } else {
    res.json(deletedSubscription);
  }
});

app.listen();

/**
 * Fungsi untuk mendapatkan tanggal saat ini dengan format ICP.
 */
function getCurrentDate() {
  const timestamp = new Number(time());
  return new Date(timestamp.valueOf() / 1000_000);
}
