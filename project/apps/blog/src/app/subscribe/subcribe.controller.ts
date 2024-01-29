import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubscribeService } from './subscribe.service';

@ApiTags('subscribe')
@Controller('subscribe')
export class SubscribeController {
  subscribeRepository: any;
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post()
  public async subscribe(@Body() body: { authorId: string; userId: string }) {
    const newSubscription = await this.subscribeService.createSubscription(
      body.authorId,
      body.userId
    );
    return newSubscription;
  }

  @Delete(':authorId/:userId')
  public async unsubscribe(@Param('authorId') authorId: string, @Param('userId') userId: string) {
    const deletedSubscription = await this.subscribeService.deleteSubscription(authorId, userId);
    return deletedSubscription;
  }

  @Get('count/:authorId')
  public async countSubscribers(@Param('authorId') authorId: string) {
    const count = await this.subscribeService.countSubscribers(authorId);
    return count;
  }

  @Get('subscribers/:authorId')
  public async findSubscribers(@Param('authorId') authorId: string) {
    const subscribers = await this.subscribeService.findSubscribers(authorId);
    return subscribers;
  }

  @Get('subscribed/:userId')
  public async findSubscribedAuthors(@Param('userId') userId: string) {
    const subscribedAuthors = await this.subscribeService.findSubscribedAuthors(userId);
    return subscribedAuthors;
  }
}
