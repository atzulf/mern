import {Ratelimit} from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config();

// membuat ratelimiter dengan membatasi 50 request tiap 30 detik
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "30 s")
});

export default ratelimit;