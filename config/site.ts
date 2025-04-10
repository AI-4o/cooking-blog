export const siteConfig = {
  name: "Cucina Deliziosa",
  url: "https://cucina-deliziosa.vercel.app",
  ogImage: "https://cucina-deliziosa.vercel.app/og.jpg",
  description: "Un blog di cucina italiana con ricette tradizionali e innovative",
  links: {
    twitter: "https://twitter.com/cucina_deliziosa",
    github: "https://github.com/cucina-deliziosa",
    instagram: "https://instagram.com/cucina_deliziosa",
    facebook: "https://facebook.com/cucinadeliziosa",
  },
  categories: [
    {
      title: "Primi piatti",
      description: "Pasta, risotti e zuppe della tradizione italiana",
      href: "/ricette?categoria=Primi piatti",
    },
    {
      title: "Secondi piatti",
      description: "Piatti a base di carne, pesce e vegetariani",
      href: "/ricette?categoria=Secondi piatti",
    },
    {
      title: "Dolci",
      description: "Dessert, dolci tradizionali e torte per ogni occasione",
      href: "/ricette?categoria=Dolci",
    },
    {
      title: "Antipasti",
      description: "Stuzzichini, finger food e aperitivi",
      href: "/ricette?categoria=Antipasti",
    },
    {
      title: "Contorni",
      description: "Verdure, insalate e accompagnamenti",
      href: "/ricette?categoria=Contorni",
    },
    {
      title: "Piatti unici",
      description: "Ricette complete per un pasto equilibrato",
      href: "/ricette?categoria=Piatti unici",
    },
  ],
}
