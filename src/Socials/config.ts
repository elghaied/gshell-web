import { GlobalConfig } from "payload";
import { revalidateSocials } from "./Hooks/reavalidateSocials";

export const Socials: GlobalConfig = {
  slug: 'socials',
  access: {

    read: () => true,

  },
  fields: [
    {
      name: 'facebook',
      type: 'text',

    },
    {
      name: 'instagram',
      type: 'text',

    },
    {
      name: 'linkedin',
      type: 'text',
    }
  ],
  hooks: {
    afterChange: [revalidateSocials],
  },
}
