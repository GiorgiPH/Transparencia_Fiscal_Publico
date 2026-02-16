import { BuscarCatalogosResponse } from '@/services/catalogos/catalogo.service';

/**
 * Interfaz para un nodo del árbol reconstruido
 */
export interface TreeNode {
  id: number;
  nombre: string;
  nivel: number;
  permiteDocumentos: boolean;
  descripcion?: string;
  icono?: string;
  orden: number;
  fechaCreacion: string | Date;
  fechaModificacion: string | Date;
  disponibilidadTiposDocumento?: any[];
  path?: Array<{ id: number; nombre: string; nivel: number }>;
  children?: TreeNode[];
}

/**
 * Reconstruye un árbol jerárquico a partir de resultados de búsqueda con path completo
 * 
 * @param searchResults Resultados de búsqueda que incluyen el path completo desde la raíz
 * @returns Árbol reconstruido con solo las ramas que contienen resultados
 */
export function reconstructTreeFromSearchResults(
  searchResults: BuscarCatalogosResponse[]
): TreeNode[] {
  if (!searchResults || searchResults.length === 0) {
    return [];
  }

  // Crear un mapa de nodos por ID para acceso rápido
  const nodeMap = new Map<number, TreeNode>();
  
  // Primero, crear todos los nodos
  searchResults.forEach(result => {
    // Crear nodo para el resultado actual
    const node: TreeNode = {
      id: result.id,
      nombre: result.nombre,
      nivel: result.nivel,
      permiteDocumentos: result.permiteDocumentos,
      descripcion: result.descripcion,
      icono: result.icono,
      orden: result.orden,
      fechaCreacion: result.fechaCreacion,
      fechaModificacion: result.fechaModificacion,
      disponibilidadTiposDocumento: result.disponibilidadTiposDocumento,
      path: result.path,
      children: [],
    };
    
    nodeMap.set(result.id, node);
  });

  // Crear un mapa de padres
  const parentMap = new Map<number, number>();
  
  // Para cada resultado, procesar su path para establecer relaciones padre-hijo
  searchResults.forEach(result => {
    if (!result.path || result.path.length === 0) {
      return;
    }

    // El último elemento del path es el nodo actual
    const currentNodeId = result.id;
    
    // Si hay más de un elemento en el path, el penúltimo es el padre
    if (result.path.length > 1) {
      const parentPathItem = result.path[result.path.length - 2];
      parentMap.set(currentNodeId, parentPathItem.id);
    }
  });

  // Construir el árbol estableciendo relaciones padre-hijo
  const rootNodes: TreeNode[] = [];
  
  nodeMap.forEach((node, nodeId) => {
    const parentId = parentMap.get(nodeId);
    
    if (parentId !== undefined) {
      const parentNode = nodeMap.get(parentId);
      if (parentNode) {
        if (!parentNode.children) {
          parentNode.children = [];
        }
        parentNode.children.push(node);
      } else {
        // Si el padre no está en los resultados, este nodo es raíz
        rootNodes.push(node);
      }
    } else {
      // Nodo sin padre en el path -> es raíz
      rootNodes.push(node);
    }
  });

  // Ordenar los nodos raíz por nivel y orden
  rootNodes.sort((a, b) => {
    if (a.nivel !== b.nivel) {
      return a.nivel - b.nivel;
    }
    return a.orden - b.orden;
  });

  // Ordenar recursivamente los hijos
  function sortChildren(node: TreeNode) {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => {
        if (a.nivel !== b.nivel) {
          return a.nivel - b.nivel;
        }
        return a.orden - b.orden;
      });
      
      node.children.forEach(sortChildren);
    }
  }
  
  rootNodes.forEach(sortChildren);

  return rootNodes;
}

/**
 * Aplana un árbol en una lista para facilitar la renderización
 * 
 * @param treeNodes Nodos del árbol
 * @returns Lista plana de nodos con información de profundidad
 */
export function flattenTreeForRendering(
  treeNodes: TreeNode[]
): Array<TreeNode & { depth: number }> {
  const result: Array<TreeNode & { depth: number }> = [];
  
  function traverse(nodes: TreeNode[], depth: number) {
    nodes.forEach(node => {
      result.push({ ...node, depth });
      if (node.children && node.children.length > 0) {
        traverse(node.children, depth + 1);
      }
    });
  }
  
  traverse(treeNodes, 0);
  return result;
}

/**
 * Encuentra un nodo en el árbol por ID
 * 
 * @param treeNodes Nodos del árbol
 * @param id ID del nodo a buscar
 * @returns El nodo encontrado o null
 */
export function findNodeInTree(
  treeNodes: TreeNode[],
  id: number
): TreeNode | null {
  for (const node of treeNodes) {
    if (node.id === id) {
      return node;
    }
    
    if (node.children && node.children.length > 0) {
      const found = findNodeInTree(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  
  return null;
}

/**
 * Obtiene el path completo de un nodo en el árbol
 * 
 * @param treeNodes Nodos del árbol
 * @param id ID del nodo
 * @returns Array con el path desde la raíz hasta el nodo
 */
export function getNodePathInTree(
  treeNodes: TreeNode[],
  id: number
): TreeNode[] {
  const path: TreeNode[] = [];
  
  function findPath(nodes: TreeNode[], targetId: number): boolean {
    for (const node of nodes) {
      if (node.id === targetId) {
        path.push(node);
        return true;
      }
      
      if (node.children && node.children.length > 0) {
        if (findPath(node.children, targetId)) {
          path.unshift(node);
          return true;
        }
      }
    }
    
    return false;
  }
  
  findPath(treeNodes, id);
  return path;
}