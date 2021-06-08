/**
 * Merekam jejak dari perdaganan pangan
 * @param {org.food.net.Trade} trade - perdagangan yang akan diproses
 * @transaction
*/

async function tradePangan(trade) {
  trade.pangan.pemilik = trade.pemilikBaru;
  let assetRegistry = await getAssetRegistry('org.food.net.Pangan');
  await assetRegistry.update(trade.pangan);
}

/**
 * Merekam jejak pendistribusian suatu pangan
 * @param {org.food.net.Distribusi} distribusi - distribusi pangan yang akan diproses
 * @param {
 * @transaction
*/
async function distribusiPangan(distribusi) {
  if (distribusi.pangan.panganRetail) {
    throw new Error('Pangan is already distributed!');
  }
  
  let panganRetail = []
  const factory = getFactory()
  for (let i = 0; i<= distribusi.pangan.jumlah ;i++) {
    const newId = distribusi.pangan.panganId + '-' + i;
    const newPanganRetail = factory.newResource('org.food.net', 'PanganRetail', newId);
    newPanganRetail.distributorPangan = distribusi.pangan.pemilik
    panganRetail = [...panganRetail, newPanganRetail];
    
    const panganRetailAssetRegistry = await getAssetRegistry('org.food.net.PanganRetail')
    await panganRetailAssetRegistry.add(newPanganRetail)
  }
  distribusi.pangan.panganRetail = panganRetail;
  const panganAssetRegistry = await getAssetRegistry('org.food.net.Pangan');
  await panganAssetRegistry.update(distribusi.pangan)
}