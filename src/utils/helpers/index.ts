import { BigNumberish, Contract, ethers, Signer } from 'ethers';
import { IGetContractDataTypes } from 'src/store/defaultSlice/slice/types';
import MemberRole from '../abi/MemberRole.json';

export interface GetLotteryResponseType {
  signer: Signer;
  connectedAccount: string;
}

/**
 * It takes a value, checks if it's defined, and if it is, it formats it as an ether value.
 * @param {BigNumberish | undefined} value - The value to be formatted.
 * @returns A string
 */
export const formatEther = (value: BigNumberish | undefined) => {
  if (value) {
    const result = ethers.utils.formatEther(value);
    return result;
  }
};

/**
 * It helper function that fetch smart contracts data when the ui is ready
 * @param {GetLotteryResponseType} data - GetLotteryResponseType - this is the response from the
 * getLottery function.
 */
export const getSmartContractData = async (
  data: GetLotteryResponseType,
): Promise<IGetContractDataTypes> => {
  const contract: Contract = new ethers.Contract(
    import.meta.env.VITE_LOCAL_CONTRACT_ADDRESS,
    MemberRole.abi,
    data.signer,
  );

  const membersCount = await contract?.membersCount();
  const roleTypesCount = await contract?.roleTypesCount();

  const roles = await contract?.getAllRoleTypes();
  const addresses = await contract?.getAllAdressess();

  return {
    contract,
    membersCount: membersCount.toNumber(),
    roles,
    usersAddress: addresses,
    roleTypesCount: roleTypesCount.toNumber(),
  };
};
