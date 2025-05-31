import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Countries with states
const countriesWithStates = [
  {
    code: "IN",
    name: "India",
    states: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Jammu and Kashmir",
      "Ladakh",
      "Lakshadweep",
      "Puducherry",
    ],
  },
  {
    code: "US",
    name: "United States",
    states: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
  },
  {
    code: "CN",
    name: "China",
    states: [
      "Anhui",
      "Beijing",
      "Chongqing",
      "Fujian",
      "Gansu",
      "Guangdong",
      "Guangxi",
      "Guizhou",
      "Hainan",
      "Hebei",
      "Heilongjiang",
      "Henan",
      "Hong Kong",
      "Hubei",
      "Hunan",
      "Inner Mongolia",
      "Jiangsu",
      "Jiangxi",
      "Jilin",
      "Liaoning",
      "Macau",
      "Ningxia",
      "Qinghai",
      "Shaanxi",
      "Shandong",
      "Shanghai",
      "Shanxi",
      "Sichuan",
      "Tianjin",
      "Tibet",
      "Xinjiang",
      "Yunnan",
      "Zhejiang",
    ],
  },
  {
    code: "DE",
    name: "Germany",
    states: [
      "Baden-Württemberg",
      "Bavaria",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hesse",
      "Lower Saxony",
      "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia",
      "Rhineland-Palatinate",
      "Saarland",
      "Saxony",
      "Saxony-Anhalt",
      "Schleswig-Holstein",
      "Thuringia",
    ],
  },
  {
    code: "JP",
    name: "Japan",
    states: [
      "Aichi",
      "Akita",
      "Aomori",
      "Chiba",
      "Ehime",
      "Fukui",
      "Fukuoka",
      "Fukushima",
      "Gifu",
      "Gunma",
      "Hiroshima",
      "Hokkaido",
      "Hyogo",
      "Ibaraki",
      "Ishikawa",
      "Iwate",
      "Kagawa",
      "Kagoshima",
      "Kanagawa",
      "Kochi",
      "Kumamoto",
      "Kyoto",
      "Mie",
      "Miyagi",
      "Miyazaki",
      "Nagano",
      "Nagasaki",
      "Nara",
      "Niigata",
      "Oita",
      "Okayama",
      "Okinawa",
      "Osaka",
      "Saga",
      "Saitama",
      "Shiga",
      "Shimane",
      "Shizuoka",
      "Tochigi",
      "Tokushima",
      "Tokyo",
      "Tottori",
      "Toyama",
      "Wakayama",
      "Yamagata",
      "Yamaguchi",
      "Yamanashi",
    ],
  },
  {
    code: "GB",
    name: "United Kingdom",
    states: ["England", "Scotland", "Wales", "Northern Ireland"],
  },
  {
    code: "FR",
    name: "France",
    states: [
      "Auvergne-Rhône-Alpes",
      "Bourgogne-Franche-Comté",
      "Brittany",
      "Centre-Val de Loire",
      "Corsica",
      "Grand Est",
      "Hauts-de-France",
      "Île-de-France",
      "Normandy",
      "Nouvelle-Aquitaine",
      "Occitanie",
      "Pays de la Loire",
      "Provence-Alpes-Côte d'Azur",
    ],
  },
  {
    code: "IT",
    name: "Italy",
    states: [
      "Abruzzo",
      "Aosta Valley",
      "Apulia",
      "Basilicata",
      "Calabria",
      "Campania",
      "Emilia-Romagna",
      "Friuli-Venezia Giulia",
      "Lazio",
      "Liguria",
      "Lombardy",
      "Marche",
      "Molise",
      "Piedmont",
      "Sardinia",
      "Sicily",
      "Trentino-Alto Adige",
      "Tuscany",
      "Umbria",
      "Veneto",
    ],
  },
  {
    code: "CA",
    name: "Canada",
    states: [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Northwest Territories",
      "Nova Scotia",
      "Nunavut",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Yukon",
    ],
  },
  {
    code: "BR",
    name: "Brazil",
    states: [
      "Acre",
      "Alagoas",
      "Amapá",
      "Amazonas",
      "Bahia",
      "Ceará",
      "Distrito Federal",
      "Espírito Santo",
      "Goiás",
      "Maranhão",
      "Mato Grosso",
      "Mato Grosso do Sul",
      "Minas Gerais",
      "Pará",
      "Paraíba",
      "Paraná",
      "Pernambuco",
      "Piauí",
      "Rio de Janeiro",
      "Rio Grande do Norte",
      "Rio Grande do Sul",
      "Rondônia",
      "Roraima",
      "Santa Catarina",
      "São Paulo",
      "Sergipe",
      "Tocantins",
    ],
  },
];

// Statuses
const statuses = ["Pending", "Active", "Expired", "Revoked"];

// Currencies
const currencies = [
  {
    code: "INR",
    name: "Indian Rupee",
  },
  {
    code: "USD",
    name: "US Dollar",
  },
  {
    code: "EUR",
    name: "Euro",
  },
  {
    code: "GBP",
    name: "British Pound",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
  },
  {
    code: "BRL",
    name: "Brazilian Real",
  },
];

// Plans

const plans = [
  {
    name: "Starter",
    price: "10900",
    originalPrice: "13900",
    description: "Perfect for small businesses and freelancers getting started",
    features: [
      "Invoice management for up to 100 clients",
      "Basic expense tracking and categorization",
      "Monthly financial reports and insights",
      "Email support with 24hr response",
      "Mobile app with offline access",
      "Professional invoice templates",
      "Basic payment gateway integration",
      "Export data to CSV/PDF formats",
    ],
  },
  {
    name: "Professional",
    price: "30900",
    originalPrice: "40900",
    description: "Advanced features for growing businesses with complex needs",
    features: [
      "Unlimited client and project management",
      "Advanced expense tracking with AI categorization",
      "Real-time financial analytics and forecasting",
      "Priority support with phone and chat assistance",
      "Multi-device sync with cloud backup",
      "Custom branding and white-label templates",
      "Automated recurring invoices and reminders",
      "Tax preparation tools and compliance reports",
      "Advanced reporting with 50+ templates",
      "API access for third-party integrations",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "50900",
    originalPrice: "75900",
    description: "Complete solution for large organizations and teams",
    features: [
      "Everything in Professional plan",
      "Advanced team collaboration and role management",
      "Custom integrations and full API access",
      "Dedicated account manager and onboarding",
      "Enterprise-grade security and compliance",
      "White-label solutions with custom domains",
      "Custom workflow automation and approvals",
      "Priority feature requests and development",
      "On-site training and implementation support",
      "Advanced audit trails and user permissions",
      "Multi-company and subsidiary management",
      "Custom SLA with 99.9% uptime guarantee",
    ],
  },
];

// Categories
const categories = [
  "Retail",
  "Wholesale",
  "Services",
  "Manufacturing",
  "Food & Beverage",
  "Healthcare",
  "Education",
  "Technology",
  "Construction",
  "Finance",
];
async function main() {
  for (const country of countriesWithStates) {
    const createdCountry = await prisma.country.create({
      data: {
        code: country.code,
        name: country.name,
        states: {
          create: country.states.map((stateName) => ({ name: stateName })),
        },
      },
    });
    console.log(`Seeded ${createdCountry.name} with its states.`);
  }

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`Seeded Categories.`);

  // for (const { name, code } of currencies) {
  //   await prisma.currency.upsert({
  //     where: { name },
  //     update: {},
  //     create: { name, code },
  //   });
  // }
  // console.log(`Seeded Currencies.`);

  for (const name of statuses) {
    await prisma.status.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  console.log(`Seeded Statuses.`);

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name }, // ✅ dynamically uses current plan's name
      update: {}, // no changes on update, you can modify this if needed
      create: {
        name: plan.name,
        description: plan.description,
        price: plan.price,
        originalPrice: plan.originalPrice,
        features: plan.features,
        isPopular: plan.isPopular || false,
      },
    });
  }

  console.log("Seeded Plans");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
