/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#cddee7",
                    200: "#9cbdce",
                    300: "#6a9bb6",
                    400: "#397a9d",
                    500: "#075985",
                    600: "#06476a",
                    700: "#045570",
                    800: "#032435",
                    900: "#01121b",
                },
                secondary: {
                    50: "#dfe3f2",
                    100: "#cccfe4",
                    200: "#9acee9",
                    300: "#67b5dd",
                    400: "#359dd2",
                    500: "#0284c7",
                    600: "#026a9f",
                    700: "#014f77",
                    800: "#013550",
                    900: "#001a28",
                },
                error: "#ff4561",
                warning: "#fbbf24",
            },
        },
    },
    plugins: [],
};
