const escapeSnapshot = component => component.debug().replace(/"/g, '\'');

export default escapeSnapshot;
