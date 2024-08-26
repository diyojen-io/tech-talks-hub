import { Poppins, Source_Code_Pro } from "next/font/google";

export const poppins = Poppins({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });
