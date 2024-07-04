export function createQueueApiPoint({
  getAllUserIds,
  secret,
  apiPoint,
}: {
  getAllUserIds: () => Promise<
    {
      id: string;
    }[]
  >; // all the userids
  secret: string;
  apiPoint: string; // temporary till i find out what is the best way to decern the user credentials
}) {
  return async function lotsofthinking() {
    const userIds = await getAllUserIds();
    for (const id of userIds) {
      // sematic representation of internal queuing system
      // takes the clerk secret and an id and adds it to the queue
      // its url is hidden because each user will have their own link?
      // not really sure how this works, but we can either make it our link
      // or a project specific link
      await fetch(apiPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ id: id }),
      });
    }
    return new Response("Success", {
      status: 200,
    });
  };
}
