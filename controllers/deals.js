import mongoose from "mongoose";
import Deal from "../models/deal.js";

/*** get all deals**/
export const getDeal = async (req, res) => {
  const { id } = req.params;

  try {
    const deal = await Deal.findById(id);

    res.status(200).json(deal);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getDeals = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 1;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Deal.countDocuments();

    const deals = await Deal.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    console.log(page);

    res
      .status(200)
      .json({
        data: deals,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getDealsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const deals = await Deal.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.status(200).json({ data: deals });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/*** create a new deal**/

export const createDeal = async (req, res) => {
  const deal = req.body;

  const newDeal = new Deal({
    ...deal,
    createdAt: new Date().toISOString(),
  });
  try {
    await newDeal.save();

    res.status(201).json(newDeal);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

export const updateDeal = async (req, res) => {
  const { id: _id } = req.params;

  const deal = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("No deal with that Id");

  const updatedDeal = await Deal.findByIdAndUpdate(_id, deal, {
    new: true,
  });

  res.json(updatedDeal);
};

export const deleteDeal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return "Deal Id does not exist";

  await Deal.findByIdAndRemove(id);

  res.json("Deal deleted succesfully");
};

export const likeDeal = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  if (!req.userId) return res.json({ message: "unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.json("This Deal Id does not exist");

  const deal = await Deal.findById(id);

  console.log(deal);

  const index = deal.likes.findIndex((id) => id === String(req.userId));

  console.log(index);

  if (index === -1) {
    deal.likes.push(req.userId);
  } else {
    deal.likes = deal.likes.filter((id) => id !== String(req.userId));
  }

  const updatedDeal = await Deal.findByIdAndUpdate(id, deal, {
    new: true,
  });

  res.json(updatedDeal);
};

export const commentDeal = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const deal = await Deal.findById(id);

  deal.comments.push(value);

  const updatedDeal = await Deal.findByIdAndUpdate(id, deal, {
    new: true,
  });

  res.json(updatedDeal);
};
