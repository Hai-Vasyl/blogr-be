import { BlogRating } from '@modules/blogs/blog-rating.entity';
import { Blog } from '@modules/blogs/blog.entity';
import { Bookmark } from '@modules/bookmarks/bookmark.entity';
import { Category } from '@modules/categories/category.entity';
import { CommentRating } from '@modules/comments/comment-rating.entity';
import { Comment } from '@modules/comments/comment.entity';
import { FileRating } from '@modules/files/file-rating.entity';
import { File } from '@modules/files/file.entity';
import { Notification } from '@modules/notifications/notification.entity';
import { Permission } from '@modules/permissions/permission.entity';
import { Role } from '@modules/roles/role.entity';
import { Section } from '@modules/sections/section.entity';
import { SubscriberPublisher } from '@modules/subscribers-publishers/subscriber-publisher.entity';
import { Tag } from '@modules/tags/tag.entity';
import { User } from '@modules/users/user.entity';
import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const databaseConfig = registerAs(
  'database',
  (): PostgresConnectionOptions => {
    const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_SYNC } =
      process.env;

    return {
      type: 'postgres',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: JSON.parse(DB_SYNC),
      entities: [
        User,
        Permission,
        Role,
        File,
        Blog,
        Section,
        Notification,
        Comment,
        CommentRating,
        BlogRating,
        Tag,
        Category,
        FileRating,
        Bookmark,
        SubscriberPublisher,
      ],
    };
  },
);
