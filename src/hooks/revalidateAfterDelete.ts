import { revalidateTag } from "next/cache";
import { CollectionAfterDeleteHook } from "payload";

export const revalidateAfterDelete: CollectionAfterDeleteHook  = ({
  collection,
  doc,
  req: { payload },
}) => {
  payload.logger.info(`Revalidating ${collection.slug} with tag: ${collection.slug}`)

  revalidateTag(collection.slug)

}
