import {Ratelimit} from "@upstash/Ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config();

// membuat ratelimiter dengan membatasi 100 request tiap 60 detik
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s")
});

export default ratelimit;