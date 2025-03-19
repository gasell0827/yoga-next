export const TYPOGRAPHY_SYSTEM = {
  fontFamily: "Suit variable",
  styles: {
    heading: {
      24: {
        bold: { fontSize: 24, fontWeight: "bold" },
        medium: { fontSize: 24, fontWeight: "medium" },
        regular: { fontSize: 24, fontWeight: "regular" },
      },
      subtitle: {
        22: { regular: { fontSize: 22, fontWeight: "regular" } },
        20: {
          bold: { fontSize: 20, fontWeight: "bold" },
          medium: { fontSize: 20, fontWeight: "medium" },
        },
      },
      body: {
        16: {
          bold: { fontSize: 16, fontWeight: "bold" },
          semibold: { fontSize: 16, fontWeight: "semibold" },
          medium: { fontSize: 16, fontWeight: "medium" },
          regular: { fontSize: 16, fontWeight: "regular" },
        },
        14: {
          bold: { fontSize: 14, fontWeight: "bold" },
          semibold: { fontSize: 14, fontWeight: "semibold" },
          medium: { fontSize: 14, fontWeight: "medium" },
          regular: { fontSize: 14, fontWeight: "regular" },
        },
      },
      caption: {
        12: {
          bold: { fontSize: 12, fontWeight: "bold" },
          semibold: { fontSize: 12, fontWeight: "semibold" },
          medium: { fontSize: 12, fontWeight: "medium" },
          regular: { fontSize: 12, fontWeight: "regular" },
        },
        11: { medium: { fontSize: 11, fontWeight: "medium" } },
        10: {
          semibold: { fontSize: 10, fontWeight: "semibold" },
          regular: { fontSize: 10, fontWeight: "regular" },
        },
      },
    },
  },
} as const;
