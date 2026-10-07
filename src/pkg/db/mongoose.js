import mongoose from "mongoose";
import { env } from "../../lib/config/env.js";

mongoose.connect(env.db.url);
