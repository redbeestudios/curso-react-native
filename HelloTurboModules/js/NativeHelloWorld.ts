import { TurboModule, TurboModuleRegistry } from 'react-native'

export interface Spec extends TurboModule {
  greet(name: string): Promise<string>
}

export default TurboModuleRegistry.get<Spec>('HelloTurboModules')
