export type Service = {
  name: string;
  description: string;
  images?: string[];
};

export type Location = {
  name: string;
  address: string;
  map: string;
};

export type BusinessInfo = {
  name: string;
  tagline: string;

  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;

  services: Service[];
  addresses: Location[];

  whyChooseUs: {
    title: string;
    points: string[];
  };

  // ✅ ADD THIS
  contactSection: {
    title: string;
    subtitle: string;
  };
};
