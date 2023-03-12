/* eslint-disable @typescript-eslint/naming-convention */
import {PrismaClient} from '@prisma/client';
import {type User as UserModel, UserRoles} from '../types';

export class User extends PrismaClient {
	/**
   * @param guildId
   * @param clientId
   * @returns User
   */
	async getOne(guildId: number | undefined | undefined, clientId: string) {
		if (!guildId) {
			return;
		}

		return await this.user.findFirst({
			where: {
				guildId,
				clientId,
			},
			include: {
				Guild: true,
				roles: true,
			},
		}) as unknown as UserModel;
	}

	/*
   * @param data
   * @returns
   */
	async create(data: UserModel) {
		return this.user.create({
			data: {
				clientId: data.clientId,
				levels: data.levels,
				xp: data.xp,
				guildId: data.guildId,
			},
			include: {
				Guild: true,
				roles: true,
			},
		});
	}

	async update(data: UserModel, clientId: number) {
		return this.user.update({
			data: {
				levels: data.levels,
				xp: data.xp,
				clientId: data.clientId,

			},
			include: {
				Guild: true,
				roles: true,
			},
			where: {
				id: clientId,
			},
		});
	}
}
