import TUser from "./User";

export default function getUserId(user: TUser): number {
    const urlParts = user.url.split('/');
    const lastPart = urlParts[urlParts.length - 2];

    return parseInt(lastPart, 10);
}