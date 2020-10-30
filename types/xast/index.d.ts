// Type definitions for non-npm package xast 1.0
// Project: https://github.com/syntax-tree/xast
// Definitions by: stefanprobst <https://github.com/stefanprobst>
//                 Titus Wormer <https://github.com/wooorm>
//                 Christian Murphy <https://github.com/ChristianMurphy>
//                 Junyoung Choi <https://github.com/rokt33r>
//                 Malav Shah <https://github.com/malav2110>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0

import { Parent as UnistParent, Literal as UnistLiteral, Node as UnistNode } from 'unist';

export { UnistNode as Node };

/**
 * Node in xast containing other nodes.
 * Its content is limited to only other xast content.
 */
export interface Parent extends UnistParent {
    children: Array<Element | Text | Comment | Doctype | Instruction | Cdata>;
}

/**
 * Union Of All primitive JavaScript Types
 */
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

/**
 * Node in xast containing a value.
 */
export interface Literal extends UnistLiteral {
    value: string;
}

/**
 * Document fragment or a whole document.
 * Should be used as the root of a tree and must not be used as a child.
 *
 * XML specifies that documents should have exactly one element child,
 * therefore a root should have exactly one element child when representing a
 * whole document.
 */
export interface Root extends Parent {
    type: 'root';
}

/**
 * An XML element.
 */
export interface Element extends Parent {
    type: 'element';
    /**
     * The element's qualified name.
     */
    name: string;
    /**
     * Information associated with the element.
     */
    attributes?: Attributes;
    children: Array<Element | Text | Comment | Instruction | Cdata>;
}

/**
 * Information associated with an element.
 */
export interface Attributes {
    [name: string]: Primitive;
}

/**
 * XML character data.
 */
export interface Text extends Literal {
    type: 'text';
}

/**
 * XML comment.
 */
export interface Comment extends Literal {
    type: 'comment';
}

/**
 * XML doctype.
 */
export interface Doctype extends UnistNode {
    type: 'doctype';
    name: string;
    /**
     * The document’s public identifier.
     */
    public?: string;
    /**
     * The document’s system identifier.
     */
    system?: string;
}

/**
 * XML processing instruction.
 */
export interface Instruction extends Literal {
    type: 'instruction';
    name: string;
}

/**
 * XML CDATA section.
 */
export interface Cdata extends Literal {
    type: 'cdata';
}
