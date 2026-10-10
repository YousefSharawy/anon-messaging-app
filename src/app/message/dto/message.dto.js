import { Types } from 'mongoose';
import { z } from 'zod';
export const sendMessageDto = z.object({
    content: z.string().trim().min(2).max(100),
    reciever: z.string().trim().refine((val) => {
        return Types.ObjectId.isValid(val);
    }),
});