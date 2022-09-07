import { log } from "./log";

describe("log", () => {
    it("calls through to the console correctly", () => {
        jest.spyOn(console, "log");

        log("foo");

        expect(console.log).toHaveBeenCalledWith("foo");
    });
});
