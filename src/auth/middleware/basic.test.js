"use strict";

process.env.SECRET = "Anything";

const base64 = require("base-64");
const middleware = require("./basic");
const { db, users } = require("../../models/index");

let userInfo = {
    admin: { userName: "admin-basic", password: "password" },
};

beforeAll(async () => {
    await db.sync();
    await users.create(userInfo.admin);
});

afterAll(async () => {
    await db.drop();
});

describe("Auth Middleware", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    describe("User Authentication", () => {
        it("should fail authentication for a user (admin) with incorrect basic credentials", async () => {
            const basicAuthString = base64.encode("username:password");
            req.headers = {
                authorization: `Basic ${basicAuthString}`,
            };

            await middleware(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.send).toHaveBeenCalledWith("Invalid Login");
        });

        it.skip("should successfully authenticate an admin user with the correct credentials", async () => {
            const basicAuthString = base64.encode(
                `${userInfo.admin.userName}:${userInfo.admin.password}`
            );
            req.headers = {
                authorization: `Basic ${basicAuthString}`,
            };

            await middleware(req, res, next);

            expect(next).toHaveBeenCalled();
        });
    });
});
