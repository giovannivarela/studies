async function fetchEventFromServer(eventId) {
  return Promise.resolve({
    id: eventId,
    internalId: `int-${eventId.slice(2)}`,
    message: `something for event ${eventId}`
  });
}

async function * dedupedEvents(...fetchEventIds) {
  let seenInternalIds = new Set();
  let eventIdToInternalIdMap = {};

  for(let eventId of fetchEventIds) {
    if(!seenInternalIds.has(eventIdToInternalIdMap[eventId])) {
      let eventBody = await fetchEventFromServer(eventId);
      eventIdToInternalIdMap[eventId] = eventBody.internalId;

      if(!seenInternalIds.has(eventBody.internalId)) {
        seenInternalIds.add(eventBody.internalId);
        yield eventBody;
      }
    }
  }
}

(async () => {
  let eventList = ['e-1', 'e-2', 'x-1', 'e-3', 'e-4', 'x-2', 'e-5', 'z-5', 'e-1'];
  for await (let event of dedupedEvents(...eventList)) {
    console.log(event.internalId);
  }
})();