import { isNumberObject } from "util/types";
import { User } from "../entities/user";
import { Vote } from "../entities/vote";
import { VotingTopic } from "../entities/voting-topic";
import { BadRequestError } from "../exceptions/bad-request-error";
import { ERROR_MESSAGES } from "../exceptions/erro-messages";
import { VotePostData } from "../interfaces/vote-post-data";
import { VotingResult } from "../interfaces/voting-result";
import { VoteRepository } from "../repositories/interfaces/vote-repository";
import { UserRepository } from "../repositories/interfaces/user-repository";
import { UserJsonParser } from "../data-parsers/json/user-from-json";

export class VoteController {
    voteRepository: VoteRepository;

    constructor(repository: VoteRepository,) {
        this.voteRepository = repository;
    }

    async createVote(user: User, votePostData: VotePostData): Promise<Vote | undefined> {
        //to create a vote, we need to check if the user exists
        //if the cpf match and if the user has already voted on the topic
        if (!user) throw new BadRequestError(ERROR_MESSAGES.USER_NOT_FOUND);
        if (user.cpf !== votePostData.cpf) throw new BadRequestError(ERROR_MESSAGES.CPF_DOES_NOT_MATCH);

        const hasVotedOnTopic = await this.voteRepository.hasUserVoted(votePostData.topicId, user.id!);
        if (hasVotedOnTopic) throw new BadRequestError(ERROR_MESSAGES.USER_ALREADY_VOTED);

        const vote = Vote.create(User.fromId(user.id), VotingTopic.fromId(votePostData.topicId), votePostData.vote);
        return this.voteRepository.saveVote(vote);
    }

    async getVotesByTopicId(topic_id: number): Promise<VotingResult[]> {
        //to get votes from a topic, topicId must be valid and integer
        if (!topic_id) throw new BadRequestError(ERROR_MESSAGES.VOTING_TOPIC_NOT_FOUND);

        return await this.voteRepository.getVotesFromTopic(topic_id);
    }
}