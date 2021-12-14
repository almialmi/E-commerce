const AccessControl = require("accesscontrol");
const ac = new AccessControl();
 
exports.roles = (function() {

ac.grant("Admin")
  .readOwn("profile")
  .updateOwn("profile")
  .createAny("product")
  .readAny("product")
  .updateAny("Product")
  .deleteAny("product")
  .deleteAny("product")
  .readAny("comment")
ac.grant("Customer")
  .readOwn("profile")
  .updateOwn("profile")
  .updateAny("Product")
  .readAny("product")
  .createAny("comment")
return ac;
})();
