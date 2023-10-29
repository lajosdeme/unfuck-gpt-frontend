const ethers = require('ethers');

const abi = require("../abis/unfuck.json")

class Ethers {
    constructor() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.provider = provider
        this.signer = this.provider.getSigner();

        this.nft = new ethers.Contract(process.env.VUE_APP_ADDR, abi, this.signer);
        this.address= this.signer.address;

        window.ethereum.on("accountsChanged", async () => {
            await this.connect();
            this.address = await this.signer.getAddress();
            window.location.reload();
        })
    }

    connect = async function () {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.provider = provider
        this.signer = this.provider.getSigner();

        await this.provider.send("eth_requestAccounts", []);
        this.address = await this.signer.getAddress();
    }

    mint = async function () {
        try {
            const tx = await this.nft.mint({
                value: ethers.utils.parseEther("0.0072237"),
                gasLimit: 500000
            })
            await tx.wait();
            return true;
        } catch (err) {
            console.log(err.reason);
            alert(err.reason);
            return false;
        }
    }
}

export default Ethers;