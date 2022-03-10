/* eslint-disable no-unused-vars */
import { advanceTo } from 'jest-date-mock';

import mongoose from 'mongoose';

import { getInstance } from '../setup-crowi';

describe('PageService page operations with non-public pages', () => {

  let dummyUser1;
  let dummyUser2;

  let crowi;
  let Page;
  let Revision;
  let User;
  let Tag;
  let PageTagRelation;
  let Bookmark;
  let Comment;
  let ShareLink;
  let PageRedirect;
  let xssSpy;
  let UserGroup;
  let UserGroupRelation;

  let rootPage;

  // pass unless the data is one of [false, 0, '', null, undefined, NaN]
  const expectAllToBeTruthy = (dataList) => {
    dataList.forEach((data, i) => {
      if (data == null) { console.log(`index: ${i}`) }
      expect(data).toBeTruthy();
    });
  };

  /**
   * Revert
   */
  // user id
  const userIdRevert1 = new mongoose.Types.ObjectId();
  const userIdRevert2 = new mongoose.Types.ObjectId();
  const userIdRevert3 = new mongoose.Types.ObjectId();
  // group id
  const groupIdRevertIsolate = new mongoose.Types.ObjectId();
  const groupIdRevertA = new mongoose.Types.ObjectId();
  const groupIdRevertB = new mongoose.Types.ObjectId();
  const groupIdRevertC = new mongoose.Types.ObjectId();
  // page id
  const pageIdRevert1 = new mongoose.Types.ObjectId();
  const pageIdRevert2 = new mongoose.Types.ObjectId();
  const pageIdRevert3 = new mongoose.Types.ObjectId();
  const pageIdRevert4 = new mongoose.Types.ObjectId();
  const pageIdRevert5 = new mongoose.Types.ObjectId();
  const pageIdRevert6 = new mongoose.Types.ObjectId();
  // revision id
  const revisionIdRevert1 = new mongoose.Types.ObjectId();
  const revisionIdRevert2 = new mongoose.Types.ObjectId();
  const revisionIdRevert3 = new mongoose.Types.ObjectId();
  const revisionIdRevert4 = new mongoose.Types.ObjectId();
  const revisionIdRevert5 = new mongoose.Types.ObjectId();
  const revisionIdRevert6 = new mongoose.Types.ObjectId();
  // tag id
  const tagIdRevert1 = new mongoose.Types.ObjectId();
  const tagIdRevert2 = new mongoose.Types.ObjectId();

  beforeAll(async() => {
    crowi = await getInstance();
    await crowi.configManager.updateConfigsInTheSameNamespace('crowi', { 'app:isV5Compatible': true });

    User = mongoose.model('User');
    Page = mongoose.model('Page');
    Revision = mongoose.model('Revision');
    Tag = mongoose.model('Tag');
    PageTagRelation = mongoose.model('PageTagRelation');
    Bookmark = mongoose.model('Bookmark');
    Comment = mongoose.model('Comment');
    ShareLink = mongoose.model('ShareLink');
    PageRedirect = mongoose.model('PageRedirect');
    UserGroup = mongoose.model('UserGroup');
    UserGroupRelation = mongoose.model('UserGroupRelation');

    /*
     * Common
     */

    dummyUser1 = await User.findOne({ username: 'v5DummyUser1' });
    dummyUser2 = await User.findOne({ username: 'v5DummyUser2' });

    xssSpy = jest.spyOn(crowi.xss, 'process').mockImplementation(path => path);

    rootPage = await Page.findOne({ path: '/' });
    if (rootPage == null) {
      const pages = await Page.insertMany([{ path: '/', grant: Page.GRANT_PUBLIC }]);
      rootPage = pages[0];
    }

    /*
     * Rename
     */

    /*
     * Duplicate
     */

    /**
     * Delete
     */

    /**
     * Delete completely
     */

    /**
     * Revert
     */
    await User.insertMany([
      {
        _id: userIdRevert1, name: 'np_revert_user1', username: 'np_revert_user1', email: 'np_revert_user1@example.com',
      },
      {
        _id: userIdRevert2, name: 'np_revert_user2', username: 'np_revert_user2', email: 'np_revert_user2@example.com',
      },
      {
        _id: userIdRevert3, name: 'np_revert_user3', username: 'np_revert_user3', email: 'np_revert_user3@example.com',
      },
    ]);
    await UserGroup.insertMany([
      {
        _id: groupIdRevertIsolate,
        name: 'np_revert_groupIsolate',
      },
      {
        _id: groupIdRevertA,
        name: 'np_revert_groupA',
      },
      {
        _id: groupIdRevertB,
        name: 'np_revert_groupB',
        parent: groupIdRevertA,
      },
      {
        _id: groupIdRevertC,
        name: 'np_revert_groupC',
        parent: groupIdRevertB,
      },
    ]);
    await UserGroupRelation.insertMany([
      {
        relatedGroup: groupIdRevertIsolate,
        relatedUser: userIdRevert1,
        createdAt: new Date(),
      },
      {
        relatedGroup: groupIdRevertIsolate,
        relatedUser: userIdRevert2,
        createdAt: new Date(),
      },
      {
        relatedGroup: groupIdRevertA,
        relatedUser: userIdRevert1,
        createdAt: new Date(),
      },
      {
        relatedGroup: groupIdRevertA,
        relatedUser: userIdRevert2,
        createdAt: new Date(),
      },
      {
        relatedGroup: groupIdRevertA,
        relatedUser: userIdRevert3,
        createdAt: new Date(),
      },
      {
        relatedGroup: groupIdRevertB,
        relatedUser: userIdRevert2,
        createdAt: new Date(),
      },
      {
        relatedGroup: groupIdRevertB,
        relatedUser: userIdRevert3,
        createdAt: new Date(),
      },
      {
        relatedGroup: groupIdRevertC,
        relatedUser: userIdRevert3,
        createdAt: new Date(),
      },
    ]);

    await Page.insertMany([
      {
        _id: pageIdRevert1,
        path: '/trash/np_revert1',
        grant: Page.GRANT_RESTRICTED,
        revision: revisionIdRevert1,
        status: Page.STATUS_DELETED,
      },
      {
        _id: pageIdRevert2,
        path: '/trash/np_revert2',
        grant: Page.GRANT_USER_GROUP,
        grantedGroup: groupIdRevertA,
        grantedUsers: [userIdRevert1._id, userIdRevert2._id, userIdRevert3._id],
        revision: revisionIdRevert2,
        status: Page.STATUS_DELETED,
      },
      {
        _id: pageIdRevert3,
        path: '/trash/np_revert3',
        revision: revisionIdRevert3,
        status: Page.STATUS_DELETED,
        parent: rootPage._id,
      },
      {
        _id: pageIdRevert4,
        path: '/trash/np_revert3/middle/np_revert4',
        grant: Page.GRANT_RESTRICTED,
        revision: revisionIdRevert4,
        status: Page.STATUS_DELETED,
      },
      {
        _id: pageIdRevert5,
        path: '/trash/np_revert5',
        grant: Page.GRANT_USER_GROUP,
        grantedGroup: groupIdRevertA,
        grantedUsers: [userIdRevert1._id, userIdRevert2._id, userIdRevert3._id],
        revision: revisionIdRevert5,
        status: Page.STATUS_DELETED,
      },
      {
        _id: pageIdRevert6,
        path: '/trash/np_revert5/middle/np_revert6',
        grant: Page.GRANT_USER_GROUP,
        grantedGroup: groupIdRevertB,
        grantedUsers: [userIdRevert2._id, userIdRevert3._id],
        revision: revisionIdRevert6,
        status: Page.STATUS_DELETED,
      },
    ]);
    await Revision.insertMany([
      {
        _id: revisionIdRevert1,
        pageId: pageIdRevert1,
        body: 'np_revert1',
        format: 'markdown',
        author: dummyUser1._id,
      },
      {
        _id: revisionIdRevert2,
        pageId: pageIdRevert2,
        body: 'np_revert2',
        format: 'markdown',
        author: userIdRevert1,
      },
      {
        _id: revisionIdRevert3,
        pageId: pageIdRevert3,
        body: 'np_revert3',
        format: 'markdown',
        author: userIdRevert1,
      },
      {
        _id: revisionIdRevert4,
        pageId: pageIdRevert4,
        body: 'np_revert4',
        format: 'markdown',
        author: userIdRevert1,
      },
      {
        _id: revisionIdRevert5,
        pageId: pageIdRevert5,
        body: 'np_revert5',
        format: 'markdown',
        author: userIdRevert1,
      },
      {
        _id: revisionIdRevert6,
        pageId: pageIdRevert6,
        body: 'np_revert6',
        format: 'markdown',
        author: userIdRevert1,
      },
    ]);

    await Tag.insertMany([
      { _id: tagIdRevert1, name: 'np_revertTag1' },
      { _id: tagIdRevert2, name: 'np_revertTag2' },
    ]);

    await PageTagRelation.insertMany([
      {
        relatedPage: pageIdRevert1,
        relatedTag: tagIdRevert1,
        isPageTrashed: true,
      },
      {
        relatedPage: pageIdRevert2,
        relatedTag: tagIdRevert2,
        isPageTrashed: true,
      },
    ]);
  });

  // describe('Rename', () => {
  //   test('dummy test to avoid test failure', async() => {
  //     // write test code
  //     expect(true).toBe(true);
  //   });
  // });
  // describe('Duplicate', () => {
  //   // test('', async() => {
  //   //   // write test code
  //   // });
  // });
  // describe('Delete', () => {
  //   // test('', async() => {
  //   //   // write test code
  //   // });
  // });
  // describe('Delete completely', () => {
  //   // test('', async() => {
  //   //   // write test code
  //   // });
  // });
  describe('revert', () => {
    const revertDeletedPage = async(page, user, options = {}, isRecursively = false) => {
      // mock return value
      const mockedRevertRecursivelyMainOperation = jest.spyOn(crowi.pageService, 'revertRecursivelyMainOperation').mockReturnValue(null);
      const revertedPage = await crowi.pageService.revertDeletedPage(page, user, options, isRecursively);

      const argsForRecursivelyMainOperation = mockedRevertRecursivelyMainOperation.mock.calls[0];

      // restores the original implementation
      mockedRevertRecursivelyMainOperation.mockRestore();
      if (isRecursively) {
        await crowi.pageService.revertRecursivelyMainOperation(...argsForRecursivelyMainOperation);
      }

      return revertedPage;

    };
    test('revert single deleted page with GRANT_RESTRICTED', async() => {
      const trashedPage = await Page.findOne({ path: '/trash/np_revert1', status: Page.STATUS_DELETED, grant: Page.GRANT_RESTRICTED });
      const revision = await Revision.findOne({ pageId: trashedPage._id });
      const tag = await Tag.findOne({ name: 'np_revertTag1' });
      const deletedPageTagRelation = await PageTagRelation.findOne({ relatedPage: trashedPage._id, relatedTag: tag._id, isPageTrashed: true });
      expectAllToBeTruthy([trashedPage, revision, tag, deletedPageTagRelation]);

      await revertDeletedPage(trashedPage, dummyUser1, {}, false);
      const revertedPage = await Page.findOne({ path: '/np_revert1' });
      const deltedPageBeforeRevert = await Page.findOne({ path: '/trash/np_revert1' });
      const pageTagRelation = await PageTagRelation.findOne({ relatedPage: revertedPage._id, relatedTag: tag._id });
      expectAllToBeTruthy([revertedPage, pageTagRelation]);

      expect(deltedPageBeforeRevert).toBe(null);

      // page with GRANT_RESTRICTED does not have parent
      expect(revertedPage.parent).toBe(null);
      expect(revertedPage.status).toBe(Page.STATUS_PUBLISHED);
      expect(revertedPage.grant).toBe(Page.GRANT_RESTRICTED);
      expect(pageTagRelation.isPageTrashed).toBe(false);
    });
    test('revert single deleted page with GRANT_USER_GROUP', async() => {
      const beforeRevertPath = '/trash/np_revert2';
      const user1 = await User.findOne({ name: 'np_revert_user1' });
      const user2 = await User.findOne({ name: 'np_revert_user2' });
      const user3 = await User.findOne({ name: 'np_revert_user3' });
      const trashedPage = await Page.findOne({ path: beforeRevertPath, status: Page.STATUS_DELETED, grant: Page.GRANT_USER_GROUP });
      const revision = await Revision.findOne({ pageId: trashedPage._id });
      const tag = await Tag.findOne({ name: 'np_revertTag2' });
      const deletedPageTagRelation = await PageTagRelation.findOne({ relatedPage: trashedPage._id, relatedTag: tag._id, isPageTrashed: true });
      expectAllToBeTruthy([trashedPage, revision, tag, deletedPageTagRelation, user2, user3]);

      await revertDeletedPage(trashedPage, user1, {}, false);
      const revertedPage = await Page.findOne({ path: '/np_revert2' });
      const trashedPageBR = await Page.findOne({ path: beforeRevertPath });
      const pageTagRelation = await PageTagRelation.findOne({ relatedPage: revertedPage._id, relatedTag: tag._id });
      expectAllToBeTruthy([revertedPage, pageTagRelation]);
      expect(trashedPageBR).toBeNull();

      expect(revertedPage.parent).toStrictEqual(rootPage._id);
      expect(revertedPage.status).toBe(Page.STATUS_PUBLISHED);
      expect(revertedPage.grant).toBe(Page.GRANT_USER_GROUP);
      expect(revertedPage.grantedGroup).toStrictEqual(groupIdRevertA);
      expect(revertedPage.grantedUsers).toStrictEqual([user1._id, user2._id, user3._id]);
      expect(pageTagRelation.isPageTrashed).toBe(false);
    });
    test('revert multiple pages: leaf page with GRANT_RESTRICTED shoud not be reverted', async() => {
      const beforeRevertPath1 = '/trash/np_revert3';
      const beforeRevertPath2 = '/trash/np_revert3/middle/np_revert4';
      const trashedPage1 = await Page.findOne({ path: beforeRevertPath1, status: Page.STATUS_DELETED, grant: Page.GRANT_PUBLIC });
      const trashedPage2 = await Page.findOne({ path: beforeRevertPath2, status: Page.STATUS_DELETED, grant: Page.GRANT_RESTRICTED });
      const revision1 = await Revision.findOne({ pageId: trashedPage1._id });
      const revision2 = await Revision.findOne({ pageId: trashedPage2._id });
      expectAllToBeTruthy([trashedPage1, trashedPage2, revision1, revision2]);

      await revertDeletedPage(trashedPage1, dummyUser1, {}, true);
      const revertedPage = await Page.findOne({ path: '/np_revert3' });
      const middlePage = await Page.findOne({ path: '/np_revert3/middle' });
      const notRestrictedPage = await Page.findOne({ path: '/np_revert3/middle/np_revert4' });
      // AR => After Revert
      const trashedPage1AR = await Page.findOne({ path: beforeRevertPath1 });
      const trashedPage2AR = await Page.findOne({ path: beforeRevertPath2 });
      const revision1AR = await Revision.findOne({ pageId: revertedPage._id });
      const revision2AR = await Revision.findOne({ pageId: trashedPage2AR._id });
      expectAllToBeTruthy([revertedPage, trashedPage2AR, revision1AR, revision2AR]);
      expect(trashedPage1AR).toBeNull();
      expect(notRestrictedPage).toBeNull();
      expect(middlePage).toBeNull();

      expect(revertedPage.parent).toStrictEqual(rootPage._id);
      expect(revertedPage.status).toBe(Page.STATUS_PUBLISHED);
      expect(revertedPage.grant).toBe(Page.GRANT_PUBLIC);
    });
    test('revert multiple pages: leaf page with GRANT_USER_GROUP shoud be reverted', async() => {
      const user = await User.findOne({ _id: userIdRevert3 });
      const beforeRevertPath1 = '/trash/np_revert5';
      const beforeRevertPath2 = '/trash/np_revert5/middle/np_revert6';
      const beforeRevertPath3 = '/trash/np_revert5/middle';
      const trashedPage1 = await Page.findOne({ path: beforeRevertPath1, status: Page.STATUS_DELETED, grant: Page.GRANT_USER_GROUP });
      const trashedPage2 = await Page.findOne({ path: beforeRevertPath2, status: Page.STATUS_DELETED, grant: Page.GRANT_USER_GROUP });
      const nonExistantPage3 = await Page.findOne({ path: beforeRevertPath3 }); // not exist
      const revision1 = await Revision.findOne({ pageId: trashedPage1._id });
      const revision2 = await Revision.findOne({ pageId: trashedPage2._id });
      expectAllToBeTruthy([trashedPage1, trashedPage2, revision1, revision2, user]);
      expect(nonExistantPage3).toBeNull();

      await revertDeletedPage(trashedPage1, user, {}, true);
      const revertedPage1 = await Page.findOne({ path: '/np_revert5' });
      const newlyCreatedPage = await Page.findOne({ path: '/np_revert5/middle' });
      const revertedPage2 = await Page.findOne({ path: '/np_revert5/middle/np_revert6' });

      // // AR => After Revert
      const trashedPage1AR = await Page.findOne({ path: beforeRevertPath1 });
      const trashedPage2AR = await Page.findOne({ path: beforeRevertPath2 });
      expectAllToBeTruthy([revertedPage1, newlyCreatedPage, revertedPage2]);
      expect(trashedPage1AR).toBeNull();
      expect(trashedPage2AR).toBeNull();

      expect(revertedPage1.parent).toStrictEqual(rootPage._id);
      expect(revertedPage2.parent).toStrictEqual(newlyCreatedPage._id);
      expect(newlyCreatedPage.parent).toStrictEqual(revertedPage1._id);

      expect(revertedPage1.status).toBe(Page.STATUS_PUBLISHED);
      expect(revertedPage2.status).toBe(Page.STATUS_PUBLISHED);
      expect(newlyCreatedPage.status).toBe(Page.STATUS_PUBLISHED);

      expect(revertedPage1.grant).toBe(Page.GRANT_USER_GROUP);
      expect(revertedPage1.grant).toBe(Page.GRANT_USER_GROUP);
      expect(newlyCreatedPage.grant).toBe(Page.GRANT_PUBLIC);

      expect(newlyCreatedPage.grantedGroup).toBe(Page.groupIdRevertA);
      expect(newlyCreatedPage.grantedGroup).toBe(Page.groupIdRevertC);
    });
  });
});
