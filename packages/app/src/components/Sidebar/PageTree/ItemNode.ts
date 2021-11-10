import { IPage } from '../../../interfaces/page';
import { HasObjectId } from '../../../interfaces/has-object-id';

type IPageForItem = Partial<IPage & {isTarget?: boolean} & HasObjectId>;

export class ItemNode {

  page: IPageForItem;

  children?: ItemNode[];

  constructor(page: IPageForItem, children: ItemNode[] = []) {
    this.page = page;
    this.children = children;
  }

  hasChildren(): boolean {
    return this.children != null && this.children?.length > 0;
  }

  static generateNodesFromPages(pages: IPageForItem[]): ItemNode[] {
    return pages.map(page => new ItemNode(page));
  }

}
