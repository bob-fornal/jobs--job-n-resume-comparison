import { StorageLayerService } from "./storage-layer.service";

export abstract class StorageClassAbstraction {

  constructor(
    public storage: StorageLayerService,
  ) {}
}