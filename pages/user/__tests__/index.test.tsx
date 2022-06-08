import React from "react";
import { shallow } from "enzyme";
import Users from "../index";

jest.mock("@components/InstantTemplate/context");
jest.mock("@components/ ");
jest.mock("@components/User/components/DetailModal");

let wrapper = shallow(<Users />)

describe("User Components", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("Should be render", () => {
        it("Render InstantTemplateProvider", () => {
            expect(wrapper.find("InstantTemplateProvider")).toHaveLength(1);
        });

        it("Render FilterView", () => {
            expect(wrapper.find("InstantTemplate")).toHaveLength(1);
        });

        it("Render DetailModal once", () => {
            expect(wrapper.find("DetailModal")).toHaveLength(1);
        });
    });

    describe("DetailModal", () => {
        React.useState = jest.fn().mockReturnValueOnce([true, {}])

        it("DetailModal would be display if true", () => {
            expect(wrapper.find("DetailModal").prop("open")).toBe(true);
        });

        it("DetailModal not be display if false", () => {
            expect(wrapper.find("DetailModal").prop("close")).toBe(false);
        });
    });
});