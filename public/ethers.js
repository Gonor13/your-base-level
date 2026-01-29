// Minimal ethers.js fallback - basic wallet connection only
window.ethers = {
    providers: {
        Web3Provider: class Web3Provider {
            constructor(provider) {
                this.provider = provider;
            }
            getSigner() {
                return {
                    getAddress: async () => {
                        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                        return accounts[0];
                    }
                };
            }
        }
    },
    utils: {
        formatEther: (wei) => {
            return (parseInt(wei) / 1e18).toFixed(4);
        }
    }
};
console.log('Using minimal ethers.js fallback');
