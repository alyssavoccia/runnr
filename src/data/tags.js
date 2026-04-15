export const TAGS = [
  {
    id: "easy",
    label: "Easy",
    textColor: "text-green-700",
    bgColor: "bg-green-100",
    borderColor: "border-green-300",
    accentColor: "bg-green-700",
  },
  {
    id: "long",
    label: "Long",
    textColor: "text-brand-700",
    bgColor: "bg-brand-100",
    borderColor: "border-brand-300",
    accentColor: "bg-brand-700",
  },
  {
    id: "tempo",
    label: "Tempo",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    accentColor: "bg-orange-700",
  },
  {
    id: "interval",
    label: "Interval",
    textColor: "text-red-700",
    bgColor: "bg-red-100",
    borderColor: "border-red-300",
    accentColor: "bg-red-700",
  },
  {
    id: "race",
    label: "Race",
    textColor: "text-sky-700",
    bgColor: "bg-sky-100",
    borderColor: "border-sky-300",
    accentColor: "bg-sky-700",
  },
  {
    id: "recovery",
    label: "Recovery",
    textColor: "text-slate-700",
    bgColor: "bg-slate-100",
    borderColor: "border-slate-300",
    accentColor: "bg-slate-700",
  },
  {
    id: "trail",
    label: "Trail",
    textColor: "text-stone-700",
    bgColor: "bg-stone-100",
    borderColor: "border-stone-300",
    accentColor: "bg-stone-700",
  },
  {
    id: "fartlek",
    label: "Fartlek",
    textColor: "text-mist-700",
    bgColor: "bg-mist-200",
    borderColor: "border-mist-300",
    accentColor: "bg-mist-700",
  },
];

export const getTagLabel = (type) => {
  return TAGS.find((tag) => tag.id === type).label;
};

export const getTagColor = (type) => {
  return TAGS.find((tag) => tag.id === type).textColor;
};

export const getTagBgColor = (type) => {
  return TAGS.find((tag) => tag.id === type).bgColor;
};

export const getTagBorder = (type) => {
  return TAGS.find((tag) => tag.id === type).borderColor;
};

export const getTagAccentColor = (type) => {
  return TAGS.find((tag) => tag.id === type).accentColor;
};
