import { User as PrismaUser } from "@prisma/client";

export interface AuthUser extends PrismaUser {
  signAccessToken(): string;
  signRefreshToken(): string;
}
