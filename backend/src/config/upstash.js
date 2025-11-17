import {Ratelimit} from "@upstash/Ratelimit"
import { Redis } from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config();

// membuat ratelimiter dengan membatasi 10 request tiap 20 detik
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s")
});

export default ratelimit;