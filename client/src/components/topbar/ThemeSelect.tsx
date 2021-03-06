import React, { useState } from "react";
import Select from "react-select";
import { useTheme, useThemeUpdate } from "../../contexts/ThemeContext";
import { ThemeOption, themeOptions, themeBackGroundColors } from "../../themes";

const ThemeSelect = () => {
  const theme = useTheme();
  const setTheme = useThemeUpdate();

  const [selectedOption, setSelectedOption] = useState<ThemeOption>({value: theme, label: "Color Theme"});

  return (
    <Select
      styles={{
        option: (provided, state) => ({
          ...provided,
          borderBottom: "1px dotted pink",
          // color: state.isSelected ? "red" : "blue",
        }),
        singleValue: (provided, state) => {
          // SELECTED VALUE
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = "opacity 300ms";
          const color =
            themeBackGroundColors[theme]["type"] === "dark" ? "white" : "black";

          return { ...provided, color, opacity, transition };
        },
        control: (provided, state) => ({
          ...provided,
          background:
            themeBackGroundColors[theme]["type"] === "dark"
              ? "#023950"
              : "#ffffff",
          color: "black",
          minWidth: "15ch",
        }),
        menu: (provided) => ({
          ...provided,
          // override border radius to match the box
          borderRadius: 0,
          // kill the gap
          marginTop: 0,
        }),
        menuList: (provided) => ({
          ...provided,
          // kill the white space on first and last option
          padding: 0,
        }),
      }}
      className=""
      defaultValue={selectedOption}
      // @ts-expect-error
      onChange={(curr: ThemeOption) => {
        setSelectedOption(curr);
        setTheme(curr.value);
        document.documentElement.style.setProperty(
          "--gutter-color",
          themeBackGroundColors[curr.value]["type"] === "light"
            ? "#f0ecec"
            : "#000000"
        );
        const body = document.querySelector("body");
        if (themeBackGroundColors[curr.value]["type"] === "light") {
          body?.classList.remove("dark");
        } else {
          if (!body?.classList.contains("dark")) {
            body?.classList.add("dark");
          }
        }
      }}
      options={themeOptions}
      placeholder="THEMMMEEE"
    />
  );
};

export default ThemeSelect;
