const {ethers} = require("ethers");
module.exports = (container) => {
    const logger = container.resolve('logger')
    const ObjectId = container.resolve('ObjectId')

    const { identificationRepo } = container.resolve('repo')
    const {
        schemaValidator,
        schemas: {
            Identification
        },
        joi: {
            Profile
        }
    } = container.resolve('models')
    const { httpCode, serverHelper, contractConfig } = container.resolve('config')
    const { provider } = container.resolve('ethers');

    const IDENTIFICATION_ABI = [
        'constructor(address)',
        'function updateDefaultClaim(string,string,string,uint,string,string,string,string) external',
        'function getDefaultClaim() public view returns(string,string,string,uint,string,string,string,string)',
        'function getClaim(string)',
        'function deleteClaim(string)',
        'function upsert(string, string)'
    ]

    const register = async (req, res) => {
        try {
            const bytecode = contractConfig.idContract.bytecode
            const body = req.body
            const { privatekey } = req.headers
            const {
                error,
                value
            } = await Profile.validate(body, {
                allowUnknown: true
            })
            if (error) {
                logger.e(error)
                return res.status(httpCode.BAD_REQUEST).json({ msg: error.message })
            }

            const wallet = new ethers.Wallet(privatekey, provider)
            const factory = new ethers.ContractFactory(IDENTIFICATION_ABI, bytecode, wallet);
            const idContract = await factory.deploy(wallet.address);

            const idModel = {
                owner: wallet.address,
                contract: idContract.address,
                claims: Object.keys(value.claims)
            }

            const {
                error: err,
                value: val
            } = await schemaValidator(idModel, 'Identification')

            if (err) {
               return res.status(httpCode.BAD_REQUEST).json({ oke: false, msg: err.message })
            }
            await identificationRepo.addIdentification(val);

            return res.status(httpCode.CREATED).json({ oke: true })
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
        }
    }

    const login = async (req, res) => {
        try {
            const { privateKey } = req.body
            const wallet = new ethers.Wallet(privateKey, provider);
            const identification = await identificationRepo.findOne({ owner: wallet.address })
            if (identification) {
                return res.status(httpCode.SUCCESS).json({
                    oke: true,
                    data: {
                        contract: identification.contract
                    }
                })
            }
            return res.status(httpCode.UNAUTHORIZED).json({ oke: false })
        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
        }
    }

    const getProfile = async (req, res) => {
        try {
            const { address } = req.query
            const { privatekey } = req.headers
            let signer = new ethers.Wallet(privatekey, provider)
            const contract = new ethers.Contract(address, IDENTIFICATION_ABI, signer)
            let defaultClaim = await contract.getDefaultClaim();
            return res.status(httpCode.SUCCESS).json({
                oke: true,
                data: {
                    nick: defaultClaim[0],
                    fullName: defaultClaim[1],
                    email: defaultClaim[2],
                    gender: ethers.utils.formatUnits(defaultClaim[3]),
                    birthdate: defaultClaim[4],
                    website: defaultClaim[5],
                    locale: defaultClaim[6],
                    location: defaultClaim[7]
                }
            })
        } catch (e) {
            logger.e(e)
            if (e.reason) {
                return res.status(httpCode.BAD_REQUEST).json({ oke: false, msg: e.reason })
            }
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
        }
    }

    const updateProfile = async (req, res) => {
        try {
            const body = req.body

        } catch (e) {
            logger.e(e)
            return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
        }
    }


    return {
        register,
        login,
        getProfile,
        updateProfile
    }
}