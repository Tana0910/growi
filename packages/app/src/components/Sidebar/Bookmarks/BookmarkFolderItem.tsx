import {
  FC, useCallback, useEffect, useState,
} from 'react';

import { useTranslation } from 'next-i18next';
import { DropdownToggle } from 'reactstrap';

import { toastError, toastSuccess } from '~/client/util/apiNotification';
import { apiv3Delete, apiv3Post, apiv3Put } from '~/client/util/apiv3-client';
import CountBadge from '~/components/Common/CountBadge';
import FolderIcon from '~/components/Icons/FolderIcon';
import TriangleIcon from '~/components/Icons/TriangleIcon';
import { BookmarkFolderItems } from '~/server/models/bookmark-folder';
import { useSWRxBookamrkFolderAndChild } from '~/stores/bookmark-folder';

import BookmarkFolderItemControl from './BookmarkFolderItemControl';
import BookmarkFolderNameInput from './BookmarkFolderNameInput';
import DeleteBookmarkFolderModal from './DeleteBookmarkFolderModal';


type BookmarkFolderItemProps = {
  bookmarkFolder: BookmarkFolderItems
  isOpen?: boolean
}
const BookmarkFolderItem: FC<BookmarkFolderItemProps> = (props: BookmarkFolderItemProps) => {
  const { bookmarkFolder, isOpen: _isOpen = false } = props;

  const { t } = useTranslation();
  const {
    name, _id: folderId, children, parent,
  } = bookmarkFolder;
  const [currentChildren, setCurrentChildren] = useState<BookmarkFolderItems[]>();
  const [isRenameInputShown, setIsRenameInputShown] = useState<boolean>(false);
  const [currentParentFolder, setCurrentParentFolder] = useState<string | null>(folderId);
  const [isOpen, setIsOpen] = useState(_isOpen);
  const [isLoadParent, setIsLoadParent] = useState<boolean>(false);
  const { data: childBookmarkFolderData, mutate: mutateChildBookmarkData } = useSWRxBookamrkFolderAndChild(isOpen || isLoadParent ? currentParentFolder : null);
  const [isRenameAction, setIsRenameAction] = useState<boolean>(false);
  const [isDeleteFolderModalShown, setIsDeleteFolderModalShown] = useState<boolean>(false);

  const childCount = useCallback((): number => {
    if (currentChildren != null && currentChildren.length > children.length) {
      return currentChildren.length;
    }
    return children.length;
  }, [children.length, currentChildren]);

  useEffect(() => {
    if (isOpen && childBookmarkFolderData != null) {
      mutateChildBookmarkData();
      setCurrentChildren(childBookmarkFolderData);
    }
    else if (isLoadParent) {
      mutateChildBookmarkData();
    }
  }, [childBookmarkFolderData, isLoadParent, isOpen, mutateChildBookmarkData]);

  const hasChildren = useCallback((): boolean => {
    if (currentChildren != null && currentChildren.length > children.length) {
      return currentChildren.length > 0;
    }
    return children.length > 0;
  }, [children.length, currentChildren]);

  const loadChildFolder = useCallback(async() => {
    setIsOpen(!isOpen);
    setIsLoadParent(false);
    setCurrentParentFolder(folderId);
  }, [folderId, isOpen]);

  const loadParent = useCallback(async() => {
    setCurrentParentFolder(parent);
    setIsLoadParent(true);
  }, [parent]);

  const onPressEnterHandler = useCallback(async(folderName: string) => {
    try {
      if (isRenameAction) {
        await apiv3Put('/bookmark-folder', { bookmarkFolderId: folderId, name: folderName, parent });
        loadParent();
        setIsRenameAction(false);
        toastSuccess(t('Rename Bookmark Folder Success'));
      }
      else {
        await apiv3Post('/bookmark-folder', { name: folderName, parent: currentParentFolder });
        setIsOpen(true);
        setIsRenameInputShown(false);
        mutateChildBookmarkData();
        toastSuccess(t('Create New Bookmark Folder Success'));
      }
    }
    catch (err) {
      toastError(err);
    }

  }, [currentParentFolder, folderId, isRenameAction, loadParent, mutateChildBookmarkData, parent, t]);

  const onClickPlusButton = useCallback(async() => {
    if (!isOpen && hasChildren()) {
      setIsOpen(true);
    }
    setIsRenameInputShown(true);
  }, [hasChildren, isOpen]);

  const RenderChildFolder = () => {
    return isOpen && currentChildren?.map((childFolder) => {
      return (
        <div key={childFolder._id} className="grw-foldertree-item-children">
          <BookmarkFolderItem
            key={childFolder._id}
            bookmarkFolder={childFolder}
          />
        </div>
      );
    });
  };

  const onClickRenameHandler = useCallback(() => {
    setIsRenameAction(true);
  }, []);

  const onClickDeleteHandler = useCallback(() => {
    setIsDeleteFolderModalShown(true);
  }, []);

  const onDeleteFolderModalClose = useCallback(() => {
    setIsDeleteFolderModalShown(false);
  }, []);

  const onClickDeleteButtonHandler = useCallback(async() => {
    try {
      await apiv3Delete(`/bookmark-folder/${folderId}`);
      setIsDeleteFolderModalShown(false);
      toastSuccess(t('Delete bookmark folder success'));

    }
    catch (err) {
      toastError(err);
    }
  }, [folderId, t]);

  return (
    <div id={`bookmark-folder-item-${folderId}`} className="grw-foldertree-item-container"
    >
      <li className="list-group-item list-group-item-action border-0 py-0 pr-3 d-flex align-items-center">
        <div className="grw-triangle-container d-flex justify-content-center">
          {hasChildren() && (
            <button
              type="button"
              className={`grw-foldertree-triangle-btn btn ${isOpen ? 'grw-foldertree-open' : ''}`}
              onClick={loadChildFolder}
            >
              <div className="d-flex justify-content-center">
                <TriangleIcon />
              </div>
            </button>
          )}
        </div>
        {
          <div>
            <FolderIcon isOpen={isOpen} />
          </div>
        }
        { isRenameAction ? (
          <BookmarkFolderNameInput
            onClickOutside={() => setIsRenameAction(false)}
            onPressEnter={onPressEnterHandler} value={name}
          />
        ) : (
          <>
            <div className='grw-foldertree-title-anchor flex-grow-1 pl-2' onClick={loadChildFolder}>
              <p className={'text-truncate m-auto '}>{name}</p>
            </div>
            {hasChildren() && (
              <div className="grw-foldertree-count-wrapper">
                <CountBadge count={ childCount() } />
              </div>
            )}
          </>
        )

        }
        <div className="grw-foldertree-control d-flex">
          <BookmarkFolderItemControl
            onClickRename={onClickRenameHandler}
            onClickDelete={onClickDeleteHandler}
          >
            <DropdownToggle color="transparent" className="border-0 rounded btn-page-item-control p-0 grw-visible-on-hover mr-1">
              <i className="icon-options fa fa-rotate-90 p-1"></i>
            </DropdownToggle>
          </BookmarkFolderItemControl>
          <button
            type="button"
            className="border-0 rounded btn btn-page-item-control p-0 grw-visible-on-hover"
            onClick={onClickPlusButton}
          >
            <i className="icon-plus d-block p-0" />
          </button>

        </div>

      </li>
      {isRenameInputShown && (
        <div className="flex-fill">
          <BookmarkFolderNameInput
            onClickOutside={() => setIsRenameInputShown(false)}
            onPressEnter={onPressEnterHandler}
          />
        </div>
      )}
      {
        RenderChildFolder()
      }
      <DeleteBookmarkFolderModal
        bookmarkFolder={bookmarkFolder}
        isOpen={isDeleteFolderModalShown}
        onClickDeleteButton={onClickDeleteButtonHandler}
        onModalClose={onDeleteFolderModalClose}/>
    </div>
  );
};

export default BookmarkFolderItem;
