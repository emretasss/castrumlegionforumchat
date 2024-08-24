"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
var google_1 = require("next/font/google");
var utils_1 = require("@/lib/utils");
var toaster_1 = require("@/components/ui/toaster");
require("./globals.css");
var Provider_1 = require("./Provider");
var theme_provider_1 = require("@/components/theme-provider");
var fontSans = (0, google_1.Inter)({
    subsets: ["latin"],
    variable: "--font-sans",
});
exports.metadata = {
    title: "NextAuth + MongoDB Tutorial",
    description: "Generated by create next app",
};
function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="en">
      <Provider_1.Provider>
        <body className={(0, utils_1.cn)("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <theme_provider_1.ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <main>
              {children}
            </main>
            <toaster_1.Toaster />
          </theme_provider_1.ThemeProvider>
        </body>
      </Provider_1.Provider>
    </html>);
}
