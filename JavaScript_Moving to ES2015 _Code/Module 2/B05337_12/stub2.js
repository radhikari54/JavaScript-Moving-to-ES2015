class Knight {
    constructor(credentialFactory) {
        this.credentialFactory = credentialFactory;
    }
    presentCredentials(toRoyalty) {
        console.log("Presenting credentials to " + toRoyalty);
        toRoyalty.send(this.credentialFactory.Create());
        return {};
    }
}
class CredentialFactory {
    Create() {
        //do complicated credential things
    }
}
class StubCredentialFactory {
    constructor() {
        this.callCounter = 0;
    }
    Create() {
        if (this.callCounter == 0)
            return new SimpleCredential();
        if (this.callCounter == 1)
            return new CredentialWithSeal();
        if (this.callCounter == 2)
            return null;
        this.callCounter++;
    }
}
function assert(value) {
    if (!value)
        throw "Assertion failure";
}
var knight = new Knight(new CredentialFactory());
knight.presentCredentials("Queen Cersei");
var knight = new Knight(new StubCredentialFactory());
var credentials = knight.presentCredentials("Lord Snow");
assert(credentials.type === "SimpleCredentials");
credentials = knight.presentCredentials("Queen Cersei");
assert(credentials.type === "CredentialWithSeal");
credentials = knight.presentCredentials("Lord Stark");
assert(credentials == null);
