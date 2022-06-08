import { DisplayModal } from "@components/TemplateComponent/constants/interface";
import { shallow } from "enzyme";
import React from "react";
import DetailModal from "../components/DetailModal";

const mockDetailModalProps: DisplayModal = {
    id: 3,
    open: true,
    handleCloseModal: jest.fn(),
};

jest.mock("@components/InstantTemplate/context");
jest.mock("@components/InstantTemplate");
jest.mock("@material-ui/core", () => ({
    Modal: (props) => <div data-testid="Modal" {...props} />,
    Button: (props) => <div data-testid="Button" {...props} />,
    Grid: (props) => <div data-testid="Grid" {...props} />,
}));

let wrapper = shallow(<DetailModal {...mockDetailModalProps} />);

afterEach(() => {
    jest.clearAllMocks();
});

describe("DetailModal", () => {
    describe("Should be render ", () => {
        it("Render Modal", () => {
            expect(wrapper.find("Modal")).toHaveLength(1);
        });

        it("Render Button", () => {
            expect(wrapper.find("Button")).toHaveLength(1);
        });

        it("Render Grid", () => {
            expect(wrapper.find("Grid")).toHaveLength(1);
        });

        it("Render Loading", () => {
            expect(wrapper.find("Loading")).toBe(true);
        });
    });


    describe("Modal handle button", () => {
        it("Should close if clicked", () => {
            wrapper.find("Button").simulate("click");
            expect(mockDetailModalProps.handleCloseModal).toHaveBeenCalled();
        });
    });
});