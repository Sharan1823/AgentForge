
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Agent
 * 
 */
export type Agent = $Result.DefaultSelection<Prisma.$AgentPayload>
/**
 * Model AgentRun
 * 
 */
export type AgentRun = $Result.DefaultSelection<Prisma.$AgentRunPayload>
/**
 * Model PendingAction
 * 
 */
export type PendingAction = $Result.DefaultSelection<Prisma.$PendingActionPayload>
/**
 * Model AgentMemory
 * 
 */
export type AgentMemory = $Result.DefaultSelection<Prisma.$AgentMemoryPayload>
/**
 * Model KnowledgeBase
 * 
 */
export type KnowledgeBase = $Result.DefaultSelection<Prisma.$KnowledgeBasePayload>
/**
 * Model Suggestion
 * 
 */
export type Suggestion = $Result.DefaultSelection<Prisma.$SuggestionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PendingActionStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  DENIED: 'DENIED'
};

export type PendingActionStatus = (typeof PendingActionStatus)[keyof typeof PendingActionStatus]


export const Department: {
  SALES: 'SALES',
  HR: 'HR',
  MARKETING: 'MARKETING',
  FINANCE: 'FINANCE',
  SUPPORT: 'SUPPORT'
};

export type Department = (typeof Department)[keyof typeof Department]


export const Role: {
  EMPLOYEE: 'EMPLOYEE',
  MANAGER: 'MANAGER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const AgentStatus: {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED'
};

export type AgentStatus = (typeof AgentStatus)[keyof typeof AgentStatus]


export const TriggerType: {
  MANUAL: 'MANUAL',
  SCHEDULED: 'SCHEDULED',
  WEBHOOK: 'WEBHOOK'
};

export type TriggerType = (typeof TriggerType)[keyof typeof TriggerType]


export const RunStatus: {
  RUNNING: 'RUNNING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  WAITING_APPROVAL: 'WAITING_APPROVAL'
};

export type RunStatus = (typeof RunStatus)[keyof typeof RunStatus]

}

export type PendingActionStatus = $Enums.PendingActionStatus

export const PendingActionStatus: typeof $Enums.PendingActionStatus

export type Department = $Enums.Department

export const Department: typeof $Enums.Department

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type AgentStatus = $Enums.AgentStatus

export const AgentStatus: typeof $Enums.AgentStatus

export type TriggerType = $Enums.TriggerType

export const TriggerType: typeof $Enums.TriggerType

export type RunStatus = $Enums.RunStatus

export const RunStatus: typeof $Enums.RunStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Companies
 * const companies = await prisma.company.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Companies
   * const companies = await prisma.company.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent`: Exposes CRUD operations for the **Agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.AgentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentRun`: Exposes CRUD operations for the **AgentRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentRuns
    * const agentRuns = await prisma.agentRun.findMany()
    * ```
    */
  get agentRun(): Prisma.AgentRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pendingAction`: Exposes CRUD operations for the **PendingAction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PendingActions
    * const pendingActions = await prisma.pendingAction.findMany()
    * ```
    */
  get pendingAction(): Prisma.PendingActionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agentMemory`: Exposes CRUD operations for the **AgentMemory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AgentMemories
    * const agentMemories = await prisma.agentMemory.findMany()
    * ```
    */
  get agentMemory(): Prisma.AgentMemoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.knowledgeBase`: Exposes CRUD operations for the **KnowledgeBase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KnowledgeBases
    * const knowledgeBases = await prisma.knowledgeBase.findMany()
    * ```
    */
  get knowledgeBase(): Prisma.KnowledgeBaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.suggestion`: Exposes CRUD operations for the **Suggestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suggestions
    * const suggestions = await prisma.suggestion.findMany()
    * ```
    */
  get suggestion(): Prisma.SuggestionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Company: 'Company',
    User: 'User',
    Agent: 'Agent',
    AgentRun: 'AgentRun',
    PendingAction: 'PendingAction',
    AgentMemory: 'AgentMemory',
    KnowledgeBase: 'KnowledgeBase',
    Suggestion: 'Suggestion'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "company" | "user" | "agent" | "agentRun" | "pendingAction" | "agentMemory" | "knowledgeBase" | "suggestion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Agent: {
        payload: Prisma.$AgentPayload<ExtArgs>
        fields: Prisma.AgentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findFirst: {
            args: Prisma.AgentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          findMany: {
            args: Prisma.AgentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          create: {
            args: Prisma.AgentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          createMany: {
            args: Prisma.AgentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          delete: {
            args: Prisma.AgentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          update: {
            args: Prisma.AgentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          deleteMany: {
            args: Prisma.AgentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>[]
          }
          upsert: {
            args: Prisma.AgentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.AgentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
          }
        }
      }
      AgentRun: {
        payload: Prisma.$AgentRunPayload<ExtArgs>
        fields: Prisma.AgentRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          findFirst: {
            args: Prisma.AgentRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          findMany: {
            args: Prisma.AgentRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>[]
          }
          create: {
            args: Prisma.AgentRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          createMany: {
            args: Prisma.AgentRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>[]
          }
          delete: {
            args: Prisma.AgentRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          update: {
            args: Prisma.AgentRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          deleteMany: {
            args: Prisma.AgentRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>[]
          }
          upsert: {
            args: Prisma.AgentRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentRunPayload>
          }
          aggregate: {
            args: Prisma.AgentRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentRun>
          }
          groupBy: {
            args: Prisma.AgentRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentRunCountArgs<ExtArgs>
            result: $Utils.Optional<AgentRunCountAggregateOutputType> | number
          }
        }
      }
      PendingAction: {
        payload: Prisma.$PendingActionPayload<ExtArgs>
        fields: Prisma.PendingActionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendingActionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendingActionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload>
          }
          findFirst: {
            args: Prisma.PendingActionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendingActionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload>
          }
          findMany: {
            args: Prisma.PendingActionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload>[]
          }
          create: {
            args: Prisma.PendingActionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload>
          }
          createMany: {
            args: Prisma.PendingActionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendingActionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload>[]
          }
          delete: {
            args: Prisma.PendingActionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload>
          }
          update: {
            args: Prisma.PendingActionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload>
          }
          deleteMany: {
            args: Prisma.PendingActionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendingActionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PendingActionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload>[]
          }
          upsert: {
            args: Prisma.PendingActionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingActionPayload>
          }
          aggregate: {
            args: Prisma.PendingActionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePendingAction>
          }
          groupBy: {
            args: Prisma.PendingActionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendingActionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendingActionCountArgs<ExtArgs>
            result: $Utils.Optional<PendingActionCountAggregateOutputType> | number
          }
        }
      }
      AgentMemory: {
        payload: Prisma.$AgentMemoryPayload<ExtArgs>
        fields: Prisma.AgentMemoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AgentMemoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AgentMemoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload>
          }
          findFirst: {
            args: Prisma.AgentMemoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AgentMemoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload>
          }
          findMany: {
            args: Prisma.AgentMemoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload>[]
          }
          create: {
            args: Prisma.AgentMemoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload>
          }
          createMany: {
            args: Prisma.AgentMemoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AgentMemoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload>[]
          }
          delete: {
            args: Prisma.AgentMemoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload>
          }
          update: {
            args: Prisma.AgentMemoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload>
          }
          deleteMany: {
            args: Prisma.AgentMemoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AgentMemoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AgentMemoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload>[]
          }
          upsert: {
            args: Prisma.AgentMemoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AgentMemoryPayload>
          }
          aggregate: {
            args: Prisma.AgentMemoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgentMemory>
          }
          groupBy: {
            args: Prisma.AgentMemoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentMemoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AgentMemoryCountArgs<ExtArgs>
            result: $Utils.Optional<AgentMemoryCountAggregateOutputType> | number
          }
        }
      }
      KnowledgeBase: {
        payload: Prisma.$KnowledgeBasePayload<ExtArgs>
        fields: Prisma.KnowledgeBaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KnowledgeBaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KnowledgeBaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          findFirst: {
            args: Prisma.KnowledgeBaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KnowledgeBaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          findMany: {
            args: Prisma.KnowledgeBaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>[]
          }
          create: {
            args: Prisma.KnowledgeBaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          createMany: {
            args: Prisma.KnowledgeBaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KnowledgeBaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>[]
          }
          delete: {
            args: Prisma.KnowledgeBaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          update: {
            args: Prisma.KnowledgeBaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          deleteMany: {
            args: Prisma.KnowledgeBaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KnowledgeBaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KnowledgeBaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>[]
          }
          upsert: {
            args: Prisma.KnowledgeBaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          aggregate: {
            args: Prisma.KnowledgeBaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKnowledgeBase>
          }
          groupBy: {
            args: Prisma.KnowledgeBaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeBaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.KnowledgeBaseCountArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeBaseCountAggregateOutputType> | number
          }
        }
      }
      Suggestion: {
        payload: Prisma.$SuggestionPayload<ExtArgs>
        fields: Prisma.SuggestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuggestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuggestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          findFirst: {
            args: Prisma.SuggestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuggestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          findMany: {
            args: Prisma.SuggestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[]
          }
          create: {
            args: Prisma.SuggestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          createMany: {
            args: Prisma.SuggestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SuggestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[]
          }
          delete: {
            args: Prisma.SuggestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          update: {
            args: Prisma.SuggestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          deleteMany: {
            args: Prisma.SuggestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuggestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SuggestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[]
          }
          upsert: {
            args: Prisma.SuggestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          aggregate: {
            args: Prisma.SuggestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuggestion>
          }
          groupBy: {
            args: Prisma.SuggestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuggestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuggestionCountArgs<ExtArgs>
            result: $Utils.Optional<SuggestionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    company?: CompanyOmit
    user?: UserOmit
    agent?: AgentOmit
    agentRun?: AgentRunOmit
    pendingAction?: PendingActionOmit
    agentMemory?: AgentMemoryOmit
    knowledgeBase?: KnowledgeBaseOmit
    suggestion?: SuggestionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
    agents: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
    agents?: boolean | CompanyCountOutputTypeCountAgentsArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountAgentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    agents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | UserCountOutputTypeCountAgentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAgentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
  }


  /**
   * Count Type AgentCountOutputType
   */

  export type AgentCountOutputType = {
    runs: number
    knowledgeBases: number
    memory: number
  }

  export type AgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    runs?: boolean | AgentCountOutputTypeCountRunsArgs
    knowledgeBases?: boolean | AgentCountOutputTypeCountKnowledgeBasesArgs
    memory?: boolean | AgentCountOutputTypeCountMemoryArgs
  }

  // Custom InputTypes
  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCountOutputType
     */
    select?: AgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentRunWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountKnowledgeBasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KnowledgeBaseWhereInput
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountMemoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentMemoryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    users?: boolean | Company$usersArgs<ExtArgs>
    agents?: boolean | Company$agentsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>

  export type CompanySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["company"]>

  export type CompanySelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Company$usersArgs<ExtArgs>
    agents?: boolean | Company$agentsArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CompanyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      agents: Prisma.$AgentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Companies and returns the data saved in the database.
     * @param {CompanyCreateManyAndReturnArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies and returns the data updated in the database.
     * @param {CompanyUpdateManyAndReturnArgs} args - Arguments to update many Companies.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Companies and only return the `id`
     * const companyWithIdOnly = await prisma.company.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    agents<T extends Company$agentsArgs<ExtArgs> = {}>(args?: Subset<T, Company$agentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
  }

  /**
   * Company createManyAndReturn
   */
  export type CompanyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company updateManyAndReturn
   */
  export type CompanyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Company.agents
   */
  export type Company$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    cursor?: AgentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    department: $Enums.Department | null
    role: $Enums.Role | null
    companyId: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    department: $Enums.Department | null
    role: $Enums.Role | null
    companyId: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    department: number
    role: number
    companyId: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    department?: true
    role?: true
    companyId?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    department?: true
    role?: true
    companyId?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    department?: true
    role?: true
    companyId?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    department: $Enums.Department
    role: $Enums.Role
    companyId: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    department?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    agents?: boolean | User$agentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    department?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    department?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    department?: boolean
    role?: boolean
    companyId?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "department" | "role" | "companyId" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    agents?: boolean | User$agentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      agents: Prisma.$AgentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      department: $Enums.Department
      role: $Enums.Role
      companyId: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    agents<T extends User$agentsArgs<ExtArgs> = {}>(args?: Subset<T, User$agentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'Department'>
    readonly role: FieldRef<"User", 'Role'>
    readonly companyId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.agents
   */
  export type User$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    cursor?: AgentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    department: $Enums.Department | null
    status: $Enums.AgentStatus | null
    trigger: $Enums.TriggerType | null
    cronSchedule: string | null
    memoryEnabled: boolean | null
    knowledgeNeeded: boolean | null
    isPublic: boolean | null
    userId: string | null
    companyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    department: $Enums.Department | null
    status: $Enums.AgentStatus | null
    trigger: $Enums.TriggerType | null
    cronSchedule: string | null
    memoryEnabled: boolean | null
    knowledgeNeeded: boolean | null
    isPublic: boolean | null
    userId: string | null
    companyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    name: number
    description: number
    department: number
    definition: number
    status: number
    trigger: number
    cronSchedule: number
    tools: number
    guardrails: number
    memoryEnabled: number
    knowledgeNeeded: number
    isPublic: number
    userId: number
    companyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AgentMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    department?: true
    status?: true
    trigger?: true
    cronSchedule?: true
    memoryEnabled?: true
    knowledgeNeeded?: true
    isPublic?: true
    userId?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    department?: true
    status?: true
    trigger?: true
    cronSchedule?: true
    memoryEnabled?: true
    knowledgeNeeded?: true
    isPublic?: true
    userId?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    department?: true
    definition?: true
    status?: true
    trigger?: true
    cronSchedule?: true
    tools?: true
    guardrails?: true
    memoryEnabled?: true
    knowledgeNeeded?: true
    isPublic?: true
    userId?: true
    companyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agent to aggregate.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type AgentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentWhereInput
    orderBy?: AgentOrderByWithAggregationInput | AgentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: AgentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonValue
    status: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule: string | null
    tools: JsonValue
    guardrails: JsonValue
    memoryEnabled: boolean
    knowledgeNeeded: boolean
    isPublic: boolean
    userId: string
    companyId: string
    createdAt: Date
    updatedAt: Date
    _count: AgentCountAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends AgentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type AgentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    department?: boolean
    definition?: boolean
    status?: boolean
    trigger?: boolean
    cronSchedule?: boolean
    tools?: boolean
    guardrails?: boolean
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    runs?: boolean | Agent$runsArgs<ExtArgs>
    knowledgeBases?: boolean | Agent$knowledgeBasesArgs<ExtArgs>
    memory?: boolean | Agent$memoryArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    department?: boolean
    definition?: boolean
    status?: boolean
    trigger?: boolean
    cronSchedule?: boolean
    tools?: boolean
    guardrails?: boolean
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    department?: boolean
    definition?: boolean
    status?: boolean
    trigger?: boolean
    cronSchedule?: boolean
    tools?: boolean
    guardrails?: boolean
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type AgentSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    department?: boolean
    definition?: boolean
    status?: boolean
    trigger?: boolean
    cronSchedule?: boolean
    tools?: boolean
    guardrails?: boolean
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId?: boolean
    companyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AgentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "department" | "definition" | "status" | "trigger" | "cronSchedule" | "tools" | "guardrails" | "memoryEnabled" | "knowledgeNeeded" | "isPublic" | "userId" | "companyId" | "createdAt" | "updatedAt", ExtArgs["result"]["agent"]>
  export type AgentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    runs?: boolean | Agent$runsArgs<ExtArgs>
    knowledgeBases?: boolean | Agent$knowledgeBasesArgs<ExtArgs>
    memory?: boolean | Agent$memoryArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AgentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }
  export type AgentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $AgentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Agent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
      runs: Prisma.$AgentRunPayload<ExtArgs>[]
      knowledgeBases: Prisma.$KnowledgeBasePayload<ExtArgs>[]
      memory: Prisma.$AgentMemoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      department: $Enums.Department
      definition: Prisma.JsonValue
      status: $Enums.AgentStatus
      trigger: $Enums.TriggerType
      cronSchedule: string | null
      tools: Prisma.JsonValue
      guardrails: Prisma.JsonValue
      memoryEnabled: boolean
      knowledgeNeeded: boolean
      isPublic: boolean
      userId: string
      companyId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type AgentGetPayload<S extends boolean | null | undefined | AgentDefaultArgs> = $Result.GetResult<Prisma.$AgentPayload, S>

  type AgentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface AgentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Agent'], meta: { name: 'Agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {AgentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentFindUniqueArgs>(args: SelectSubset<T, AgentFindUniqueArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentFindFirstArgs>(args?: SelectSubset<T, AgentFindFirstArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentFindManyArgs>(args?: SelectSubset<T, AgentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent.
     * @param {AgentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends AgentCreateArgs>(args: SelectSubset<T, AgentCreateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents.
     * @param {AgentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentCreateManyArgs>(args?: SelectSubset<T, AgentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {AgentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent.
     * @param {AgentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends AgentDeleteArgs>(args: SelectSubset<T, AgentDeleteArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent.
     * @param {AgentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentUpdateArgs>(args: SelectSubset<T, AgentUpdateArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents.
     * @param {AgentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentDeleteManyArgs>(args?: SelectSubset<T, AgentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentUpdateManyArgs>(args: SelectSubset<T, AgentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {AgentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent.
     * @param {AgentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends AgentUpsertArgs>(args: SelectSubset<T, AgentUpsertArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends AgentCountArgs>(
      args?: Subset<T, AgentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentGroupByArgs['orderBy'] }
        : { orderBy?: AgentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Agent model
   */
  readonly fields: AgentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    runs<T extends Agent$runsArgs<ExtArgs> = {}>(args?: Subset<T, Agent$runsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    knowledgeBases<T extends Agent$knowledgeBasesArgs<ExtArgs> = {}>(args?: Subset<T, Agent$knowledgeBasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memory<T extends Agent$memoryArgs<ExtArgs> = {}>(args?: Subset<T, Agent$memoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Agent model
   */
  interface AgentFieldRefs {
    readonly id: FieldRef<"Agent", 'String'>
    readonly name: FieldRef<"Agent", 'String'>
    readonly description: FieldRef<"Agent", 'String'>
    readonly department: FieldRef<"Agent", 'Department'>
    readonly definition: FieldRef<"Agent", 'Json'>
    readonly status: FieldRef<"Agent", 'AgentStatus'>
    readonly trigger: FieldRef<"Agent", 'TriggerType'>
    readonly cronSchedule: FieldRef<"Agent", 'String'>
    readonly tools: FieldRef<"Agent", 'Json'>
    readonly guardrails: FieldRef<"Agent", 'Json'>
    readonly memoryEnabled: FieldRef<"Agent", 'Boolean'>
    readonly knowledgeNeeded: FieldRef<"Agent", 'Boolean'>
    readonly isPublic: FieldRef<"Agent", 'Boolean'>
    readonly userId: FieldRef<"Agent", 'String'>
    readonly companyId: FieldRef<"Agent", 'String'>
    readonly createdAt: FieldRef<"Agent", 'DateTime'>
    readonly updatedAt: FieldRef<"Agent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Agent findUnique
   */
  export type AgentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findUniqueOrThrow
   */
  export type AgentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent findFirst
   */
  export type AgentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findFirstOrThrow
   */
  export type AgentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agent to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent findMany
   */
  export type AgentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter, which Agents to fetch.
     */
    where?: AgentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Agents to fetch.
     */
    orderBy?: AgentOrderByWithRelationInput | AgentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Agents.
     */
    cursor?: AgentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * Agent create
   */
  export type AgentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to create a Agent.
     */
    data: XOR<AgentCreateInput, AgentUncheckedCreateInput>
  }

  /**
   * Agent createMany
   */
  export type AgentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
  }

  /**
   * Agent createManyAndReturn
   */
  export type AgentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to create many Agents.
     */
    data: AgentCreateManyInput | AgentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agent update
   */
  export type AgentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The data needed to update a Agent.
     */
    data: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
    /**
     * Choose, which Agent to update.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent updateMany
   */
  export type AgentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
  }

  /**
   * Agent updateManyAndReturn
   */
  export type AgentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * The data used to update Agents.
     */
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyInput>
    /**
     * Filter which Agents to update
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Agent upsert
   */
  export type AgentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * The filter to search for the Agent to update in case it exists.
     */
    where: AgentWhereUniqueInput
    /**
     * In case the Agent found by the `where` argument doesn't exist, create a new Agent with this data.
     */
    create: XOR<AgentCreateInput, AgentUncheckedCreateInput>
    /**
     * In case the Agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentUpdateInput, AgentUncheckedUpdateInput>
  }

  /**
   * Agent delete
   */
  export type AgentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
    /**
     * Filter which Agent to delete.
     */
    where: AgentWhereUniqueInput
  }

  /**
   * Agent deleteMany
   */
  export type AgentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Agents to delete
     */
    where?: AgentWhereInput
    /**
     * Limit how many Agents to delete.
     */
    limit?: number
  }

  /**
   * Agent.runs
   */
  export type Agent$runsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    where?: AgentRunWhereInput
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    cursor?: AgentRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * Agent.knowledgeBases
   */
  export type Agent$knowledgeBasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    where?: KnowledgeBaseWhereInput
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    cursor?: KnowledgeBaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * Agent.memory
   */
  export type Agent$memoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    where?: AgentMemoryWhereInput
    orderBy?: AgentMemoryOrderByWithRelationInput | AgentMemoryOrderByWithRelationInput[]
    cursor?: AgentMemoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentMemoryScalarFieldEnum | AgentMemoryScalarFieldEnum[]
  }

  /**
   * Agent without action
   */
  export type AgentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Agent
     */
    select?: AgentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Agent
     */
    omit?: AgentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentInclude<ExtArgs> | null
  }


  /**
   * Model AgentRun
   */

  export type AggregateAgentRun = {
    _count: AgentRunCountAggregateOutputType | null
    _min: AgentRunMinAggregateOutputType | null
    _max: AgentRunMaxAggregateOutputType | null
  }

  export type AgentRunMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    status: $Enums.RunStatus | null
    output: string | null
    triggeredBy: string | null
    startedAt: Date | null
    endedAt: Date | null
  }

  export type AgentRunMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    status: $Enums.RunStatus | null
    output: string | null
    triggeredBy: string | null
    startedAt: Date | null
    endedAt: Date | null
  }

  export type AgentRunCountAggregateOutputType = {
    id: number
    agentId: number
    status: number
    logs: number
    output: number
    triggeredBy: number
    startedAt: number
    endedAt: number
    _all: number
  }


  export type AgentRunMinAggregateInputType = {
    id?: true
    agentId?: true
    status?: true
    output?: true
    triggeredBy?: true
    startedAt?: true
    endedAt?: true
  }

  export type AgentRunMaxAggregateInputType = {
    id?: true
    agentId?: true
    status?: true
    output?: true
    triggeredBy?: true
    startedAt?: true
    endedAt?: true
  }

  export type AgentRunCountAggregateInputType = {
    id?: true
    agentId?: true
    status?: true
    logs?: true
    output?: true
    triggeredBy?: true
    startedAt?: true
    endedAt?: true
    _all?: true
  }

  export type AgentRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentRun to aggregate.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentRuns
    **/
    _count?: true | AgentRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentRunMaxAggregateInputType
  }

  export type GetAgentRunAggregateType<T extends AgentRunAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentRun[P]>
      : GetScalarType<T[P], AggregateAgentRun[P]>
  }




  export type AgentRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentRunWhereInput
    orderBy?: AgentRunOrderByWithAggregationInput | AgentRunOrderByWithAggregationInput[]
    by: AgentRunScalarFieldEnum[] | AgentRunScalarFieldEnum
    having?: AgentRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentRunCountAggregateInputType | true
    _min?: AgentRunMinAggregateInputType
    _max?: AgentRunMaxAggregateInputType
  }

  export type AgentRunGroupByOutputType = {
    id: string
    agentId: string
    status: $Enums.RunStatus
    logs: JsonValue
    output: string | null
    triggeredBy: string
    startedAt: Date
    endedAt: Date | null
    _count: AgentRunCountAggregateOutputType | null
    _min: AgentRunMinAggregateOutputType | null
    _max: AgentRunMaxAggregateOutputType | null
  }

  type GetAgentRunGroupByPayload<T extends AgentRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentRunGroupByOutputType[P]>
            : GetScalarType<T[P], AgentRunGroupByOutputType[P]>
        }
      >
    >


  export type AgentRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    status?: boolean
    logs?: boolean
    output?: boolean
    triggeredBy?: boolean
    startedAt?: boolean
    endedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    pendingAction?: boolean | AgentRun$pendingActionArgs<ExtArgs>
  }, ExtArgs["result"]["agentRun"]>

  export type AgentRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    status?: boolean
    logs?: boolean
    output?: boolean
    triggeredBy?: boolean
    startedAt?: boolean
    endedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentRun"]>

  export type AgentRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    status?: boolean
    logs?: boolean
    output?: boolean
    triggeredBy?: boolean
    startedAt?: boolean
    endedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentRun"]>

  export type AgentRunSelectScalar = {
    id?: boolean
    agentId?: boolean
    status?: boolean
    logs?: boolean
    output?: boolean
    triggeredBy?: boolean
    startedAt?: boolean
    endedAt?: boolean
  }

  export type AgentRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "status" | "logs" | "output" | "triggeredBy" | "startedAt" | "endedAt", ExtArgs["result"]["agentRun"]>
  export type AgentRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
    pendingAction?: boolean | AgentRun$pendingActionArgs<ExtArgs>
  }
  export type AgentRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type AgentRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $AgentRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentRun"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
      pendingAction: Prisma.$PendingActionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      status: $Enums.RunStatus
      logs: Prisma.JsonValue
      output: string | null
      triggeredBy: string
      startedAt: Date
      endedAt: Date | null
    }, ExtArgs["result"]["agentRun"]>
    composites: {}
  }

  type AgentRunGetPayload<S extends boolean | null | undefined | AgentRunDefaultArgs> = $Result.GetResult<Prisma.$AgentRunPayload, S>

  type AgentRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentRunCountAggregateInputType | true
    }

  export interface AgentRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentRun'], meta: { name: 'AgentRun' } }
    /**
     * Find zero or one AgentRun that matches the filter.
     * @param {AgentRunFindUniqueArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentRunFindUniqueArgs>(args: SelectSubset<T, AgentRunFindUniqueArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentRunFindUniqueOrThrowArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentRunFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunFindFirstArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentRunFindFirstArgs>(args?: SelectSubset<T, AgentRunFindFirstArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunFindFirstOrThrowArgs} args - Arguments to find a AgentRun
     * @example
     * // Get one AgentRun
     * const agentRun = await prisma.agentRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentRunFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentRuns
     * const agentRuns = await prisma.agentRun.findMany()
     * 
     * // Get first 10 AgentRuns
     * const agentRuns = await prisma.agentRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentRunWithIdOnly = await prisma.agentRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentRunFindManyArgs>(args?: SelectSubset<T, AgentRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentRun.
     * @param {AgentRunCreateArgs} args - Arguments to create a AgentRun.
     * @example
     * // Create one AgentRun
     * const AgentRun = await prisma.agentRun.create({
     *   data: {
     *     // ... data to create a AgentRun
     *   }
     * })
     * 
     */
    create<T extends AgentRunCreateArgs>(args: SelectSubset<T, AgentRunCreateArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentRuns.
     * @param {AgentRunCreateManyArgs} args - Arguments to create many AgentRuns.
     * @example
     * // Create many AgentRuns
     * const agentRun = await prisma.agentRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentRunCreateManyArgs>(args?: SelectSubset<T, AgentRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentRuns and returns the data saved in the database.
     * @param {AgentRunCreateManyAndReturnArgs} args - Arguments to create many AgentRuns.
     * @example
     * // Create many AgentRuns
     * const agentRun = await prisma.agentRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentRuns and only return the `id`
     * const agentRunWithIdOnly = await prisma.agentRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentRunCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentRun.
     * @param {AgentRunDeleteArgs} args - Arguments to delete one AgentRun.
     * @example
     * // Delete one AgentRun
     * const AgentRun = await prisma.agentRun.delete({
     *   where: {
     *     // ... filter to delete one AgentRun
     *   }
     * })
     * 
     */
    delete<T extends AgentRunDeleteArgs>(args: SelectSubset<T, AgentRunDeleteArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentRun.
     * @param {AgentRunUpdateArgs} args - Arguments to update one AgentRun.
     * @example
     * // Update one AgentRun
     * const agentRun = await prisma.agentRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentRunUpdateArgs>(args: SelectSubset<T, AgentRunUpdateArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentRuns.
     * @param {AgentRunDeleteManyArgs} args - Arguments to filter AgentRuns to delete.
     * @example
     * // Delete a few AgentRuns
     * const { count } = await prisma.agentRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentRunDeleteManyArgs>(args?: SelectSubset<T, AgentRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentRuns
     * const agentRun = await prisma.agentRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentRunUpdateManyArgs>(args: SelectSubset<T, AgentRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentRuns and returns the data updated in the database.
     * @param {AgentRunUpdateManyAndReturnArgs} args - Arguments to update many AgentRuns.
     * @example
     * // Update many AgentRuns
     * const agentRun = await prisma.agentRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentRuns and only return the `id`
     * const agentRunWithIdOnly = await prisma.agentRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentRunUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentRun.
     * @param {AgentRunUpsertArgs} args - Arguments to update or create a AgentRun.
     * @example
     * // Update or create a AgentRun
     * const agentRun = await prisma.agentRun.upsert({
     *   create: {
     *     // ... data to create a AgentRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentRun we want to update
     *   }
     * })
     */
    upsert<T extends AgentRunUpsertArgs>(args: SelectSubset<T, AgentRunUpsertArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunCountArgs} args - Arguments to filter AgentRuns to count.
     * @example
     * // Count the number of AgentRuns
     * const count = await prisma.agentRun.count({
     *   where: {
     *     // ... the filter for the AgentRuns we want to count
     *   }
     * })
    **/
    count<T extends AgentRunCountArgs>(
      args?: Subset<T, AgentRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentRunAggregateArgs>(args: Subset<T, AgentRunAggregateArgs>): Prisma.PrismaPromise<GetAgentRunAggregateType<T>>

    /**
     * Group by AgentRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentRunGroupByArgs['orderBy'] }
        : { orderBy?: AgentRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentRun model
   */
  readonly fields: AgentRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pendingAction<T extends AgentRun$pendingActionArgs<ExtArgs> = {}>(args?: Subset<T, AgentRun$pendingActionArgs<ExtArgs>>): Prisma__PendingActionClient<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentRun model
   */
  interface AgentRunFieldRefs {
    readonly id: FieldRef<"AgentRun", 'String'>
    readonly agentId: FieldRef<"AgentRun", 'String'>
    readonly status: FieldRef<"AgentRun", 'RunStatus'>
    readonly logs: FieldRef<"AgentRun", 'Json'>
    readonly output: FieldRef<"AgentRun", 'String'>
    readonly triggeredBy: FieldRef<"AgentRun", 'String'>
    readonly startedAt: FieldRef<"AgentRun", 'DateTime'>
    readonly endedAt: FieldRef<"AgentRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentRun findUnique
   */
  export type AgentRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun findUniqueOrThrow
   */
  export type AgentRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun findFirst
   */
  export type AgentRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentRuns.
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentRuns.
     */
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * AgentRun findFirstOrThrow
   */
  export type AgentRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRun to fetch.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentRuns.
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentRuns.
     */
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * AgentRun findMany
   */
  export type AgentRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter, which AgentRuns to fetch.
     */
    where?: AgentRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentRuns to fetch.
     */
    orderBy?: AgentRunOrderByWithRelationInput | AgentRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentRuns.
     */
    cursor?: AgentRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentRuns.
     */
    skip?: number
    distinct?: AgentRunScalarFieldEnum | AgentRunScalarFieldEnum[]
  }

  /**
   * AgentRun create
   */
  export type AgentRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentRun.
     */
    data: XOR<AgentRunCreateInput, AgentRunUncheckedCreateInput>
  }

  /**
   * AgentRun createMany
   */
  export type AgentRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentRuns.
     */
    data: AgentRunCreateManyInput | AgentRunCreateManyInput[]
  }

  /**
   * AgentRun createManyAndReturn
   */
  export type AgentRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * The data used to create many AgentRuns.
     */
    data: AgentRunCreateManyInput | AgentRunCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentRun update
   */
  export type AgentRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentRun.
     */
    data: XOR<AgentRunUpdateInput, AgentRunUncheckedUpdateInput>
    /**
     * Choose, which AgentRun to update.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun updateMany
   */
  export type AgentRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentRuns.
     */
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyInput>
    /**
     * Filter which AgentRuns to update
     */
    where?: AgentRunWhereInput
    /**
     * Limit how many AgentRuns to update.
     */
    limit?: number
  }

  /**
   * AgentRun updateManyAndReturn
   */
  export type AgentRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * The data used to update AgentRuns.
     */
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyInput>
    /**
     * Filter which AgentRuns to update
     */
    where?: AgentRunWhereInput
    /**
     * Limit how many AgentRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentRun upsert
   */
  export type AgentRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentRun to update in case it exists.
     */
    where: AgentRunWhereUniqueInput
    /**
     * In case the AgentRun found by the `where` argument doesn't exist, create a new AgentRun with this data.
     */
    create: XOR<AgentRunCreateInput, AgentRunUncheckedCreateInput>
    /**
     * In case the AgentRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentRunUpdateInput, AgentRunUncheckedUpdateInput>
  }

  /**
   * AgentRun delete
   */
  export type AgentRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
    /**
     * Filter which AgentRun to delete.
     */
    where: AgentRunWhereUniqueInput
  }

  /**
   * AgentRun deleteMany
   */
  export type AgentRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentRuns to delete
     */
    where?: AgentRunWhereInput
    /**
     * Limit how many AgentRuns to delete.
     */
    limit?: number
  }

  /**
   * AgentRun.pendingAction
   */
  export type AgentRun$pendingActionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    where?: PendingActionWhereInput
  }

  /**
   * AgentRun without action
   */
  export type AgentRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentRun
     */
    select?: AgentRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentRun
     */
    omit?: AgentRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentRunInclude<ExtArgs> | null
  }


  /**
   * Model PendingAction
   */

  export type AggregatePendingAction = {
    _count: PendingActionCountAggregateOutputType | null
    _min: PendingActionMinAggregateOutputType | null
    _max: PendingActionMaxAggregateOutputType | null
  }

  export type PendingActionMinAggregateOutputType = {
    id: string | null
    runId: string | null
    action: string | null
    status: $Enums.PendingActionStatus | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PendingActionMaxAggregateOutputType = {
    id: string | null
    runId: string | null
    action: string | null
    status: $Enums.PendingActionStatus | null
    message: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PendingActionCountAggregateOutputType = {
    id: number
    runId: number
    action: number
    status: number
    message: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PendingActionMinAggregateInputType = {
    id?: true
    runId?: true
    action?: true
    status?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PendingActionMaxAggregateInputType = {
    id?: true
    runId?: true
    action?: true
    status?: true
    message?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PendingActionCountAggregateInputType = {
    id?: true
    runId?: true
    action?: true
    status?: true
    message?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PendingActionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingAction to aggregate.
     */
    where?: PendingActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingActions to fetch.
     */
    orderBy?: PendingActionOrderByWithRelationInput | PendingActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendingActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PendingActions
    **/
    _count?: true | PendingActionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendingActionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendingActionMaxAggregateInputType
  }

  export type GetPendingActionAggregateType<T extends PendingActionAggregateArgs> = {
        [P in keyof T & keyof AggregatePendingAction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePendingAction[P]>
      : GetScalarType<T[P], AggregatePendingAction[P]>
  }




  export type PendingActionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendingActionWhereInput
    orderBy?: PendingActionOrderByWithAggregationInput | PendingActionOrderByWithAggregationInput[]
    by: PendingActionScalarFieldEnum[] | PendingActionScalarFieldEnum
    having?: PendingActionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendingActionCountAggregateInputType | true
    _min?: PendingActionMinAggregateInputType
    _max?: PendingActionMaxAggregateInputType
  }

  export type PendingActionGroupByOutputType = {
    id: string
    runId: string
    action: string
    status: $Enums.PendingActionStatus
    message: string
    createdAt: Date
    updatedAt: Date
    _count: PendingActionCountAggregateOutputType | null
    _min: PendingActionMinAggregateOutputType | null
    _max: PendingActionMaxAggregateOutputType | null
  }

  type GetPendingActionGroupByPayload<T extends PendingActionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendingActionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendingActionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendingActionGroupByOutputType[P]>
            : GetScalarType<T[P], PendingActionGroupByOutputType[P]>
        }
      >
    >


  export type PendingActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    action?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pendingAction"]>

  export type PendingActionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    action?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pendingAction"]>

  export type PendingActionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    runId?: boolean
    action?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pendingAction"]>

  export type PendingActionSelectScalar = {
    id?: boolean
    runId?: boolean
    action?: boolean
    status?: boolean
    message?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PendingActionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "runId" | "action" | "status" | "message" | "createdAt" | "updatedAt", ExtArgs["result"]["pendingAction"]>
  export type PendingActionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }
  export type PendingActionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }
  export type PendingActionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    run?: boolean | AgentRunDefaultArgs<ExtArgs>
  }

  export type $PendingActionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PendingAction"
    objects: {
      run: Prisma.$AgentRunPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      runId: string
      action: string
      status: $Enums.PendingActionStatus
      message: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pendingAction"]>
    composites: {}
  }

  type PendingActionGetPayload<S extends boolean | null | undefined | PendingActionDefaultArgs> = $Result.GetResult<Prisma.$PendingActionPayload, S>

  type PendingActionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PendingActionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PendingActionCountAggregateInputType | true
    }

  export interface PendingActionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PendingAction'], meta: { name: 'PendingAction' } }
    /**
     * Find zero or one PendingAction that matches the filter.
     * @param {PendingActionFindUniqueArgs} args - Arguments to find a PendingAction
     * @example
     * // Get one PendingAction
     * const pendingAction = await prisma.pendingAction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendingActionFindUniqueArgs>(args: SelectSubset<T, PendingActionFindUniqueArgs<ExtArgs>>): Prisma__PendingActionClient<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PendingAction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PendingActionFindUniqueOrThrowArgs} args - Arguments to find a PendingAction
     * @example
     * // Get one PendingAction
     * const pendingAction = await prisma.pendingAction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendingActionFindUniqueOrThrowArgs>(args: SelectSubset<T, PendingActionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendingActionClient<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingAction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingActionFindFirstArgs} args - Arguments to find a PendingAction
     * @example
     * // Get one PendingAction
     * const pendingAction = await prisma.pendingAction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendingActionFindFirstArgs>(args?: SelectSubset<T, PendingActionFindFirstArgs<ExtArgs>>): Prisma__PendingActionClient<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PendingAction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingActionFindFirstOrThrowArgs} args - Arguments to find a PendingAction
     * @example
     * // Get one PendingAction
     * const pendingAction = await prisma.pendingAction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendingActionFindFirstOrThrowArgs>(args?: SelectSubset<T, PendingActionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendingActionClient<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PendingActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingActionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PendingActions
     * const pendingActions = await prisma.pendingAction.findMany()
     * 
     * // Get first 10 PendingActions
     * const pendingActions = await prisma.pendingAction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pendingActionWithIdOnly = await prisma.pendingAction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PendingActionFindManyArgs>(args?: SelectSubset<T, PendingActionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PendingAction.
     * @param {PendingActionCreateArgs} args - Arguments to create a PendingAction.
     * @example
     * // Create one PendingAction
     * const PendingAction = await prisma.pendingAction.create({
     *   data: {
     *     // ... data to create a PendingAction
     *   }
     * })
     * 
     */
    create<T extends PendingActionCreateArgs>(args: SelectSubset<T, PendingActionCreateArgs<ExtArgs>>): Prisma__PendingActionClient<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PendingActions.
     * @param {PendingActionCreateManyArgs} args - Arguments to create many PendingActions.
     * @example
     * // Create many PendingActions
     * const pendingAction = await prisma.pendingAction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendingActionCreateManyArgs>(args?: SelectSubset<T, PendingActionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PendingActions and returns the data saved in the database.
     * @param {PendingActionCreateManyAndReturnArgs} args - Arguments to create many PendingActions.
     * @example
     * // Create many PendingActions
     * const pendingAction = await prisma.pendingAction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PendingActions and only return the `id`
     * const pendingActionWithIdOnly = await prisma.pendingAction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendingActionCreateManyAndReturnArgs>(args?: SelectSubset<T, PendingActionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PendingAction.
     * @param {PendingActionDeleteArgs} args - Arguments to delete one PendingAction.
     * @example
     * // Delete one PendingAction
     * const PendingAction = await prisma.pendingAction.delete({
     *   where: {
     *     // ... filter to delete one PendingAction
     *   }
     * })
     * 
     */
    delete<T extends PendingActionDeleteArgs>(args: SelectSubset<T, PendingActionDeleteArgs<ExtArgs>>): Prisma__PendingActionClient<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PendingAction.
     * @param {PendingActionUpdateArgs} args - Arguments to update one PendingAction.
     * @example
     * // Update one PendingAction
     * const pendingAction = await prisma.pendingAction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendingActionUpdateArgs>(args: SelectSubset<T, PendingActionUpdateArgs<ExtArgs>>): Prisma__PendingActionClient<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PendingActions.
     * @param {PendingActionDeleteManyArgs} args - Arguments to filter PendingActions to delete.
     * @example
     * // Delete a few PendingActions
     * const { count } = await prisma.pendingAction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendingActionDeleteManyArgs>(args?: SelectSubset<T, PendingActionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingActionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PendingActions
     * const pendingAction = await prisma.pendingAction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendingActionUpdateManyArgs>(args: SelectSubset<T, PendingActionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingActions and returns the data updated in the database.
     * @param {PendingActionUpdateManyAndReturnArgs} args - Arguments to update many PendingActions.
     * @example
     * // Update many PendingActions
     * const pendingAction = await prisma.pendingAction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PendingActions and only return the `id`
     * const pendingActionWithIdOnly = await prisma.pendingAction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PendingActionUpdateManyAndReturnArgs>(args: SelectSubset<T, PendingActionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PendingAction.
     * @param {PendingActionUpsertArgs} args - Arguments to update or create a PendingAction.
     * @example
     * // Update or create a PendingAction
     * const pendingAction = await prisma.pendingAction.upsert({
     *   create: {
     *     // ... data to create a PendingAction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PendingAction we want to update
     *   }
     * })
     */
    upsert<T extends PendingActionUpsertArgs>(args: SelectSubset<T, PendingActionUpsertArgs<ExtArgs>>): Prisma__PendingActionClient<$Result.GetResult<Prisma.$PendingActionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PendingActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingActionCountArgs} args - Arguments to filter PendingActions to count.
     * @example
     * // Count the number of PendingActions
     * const count = await prisma.pendingAction.count({
     *   where: {
     *     // ... the filter for the PendingActions we want to count
     *   }
     * })
    **/
    count<T extends PendingActionCountArgs>(
      args?: Subset<T, PendingActionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendingActionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PendingAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingActionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PendingActionAggregateArgs>(args: Subset<T, PendingActionAggregateArgs>): Prisma.PrismaPromise<GetPendingActionAggregateType<T>>

    /**
     * Group by PendingAction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingActionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PendingActionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendingActionGroupByArgs['orderBy'] }
        : { orderBy?: PendingActionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PendingActionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendingActionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PendingAction model
   */
  readonly fields: PendingActionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PendingAction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendingActionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    run<T extends AgentRunDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentRunDefaultArgs<ExtArgs>>): Prisma__AgentRunClient<$Result.GetResult<Prisma.$AgentRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PendingAction model
   */
  interface PendingActionFieldRefs {
    readonly id: FieldRef<"PendingAction", 'String'>
    readonly runId: FieldRef<"PendingAction", 'String'>
    readonly action: FieldRef<"PendingAction", 'String'>
    readonly status: FieldRef<"PendingAction", 'PendingActionStatus'>
    readonly message: FieldRef<"PendingAction", 'String'>
    readonly createdAt: FieldRef<"PendingAction", 'DateTime'>
    readonly updatedAt: FieldRef<"PendingAction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PendingAction findUnique
   */
  export type PendingActionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    /**
     * Filter, which PendingAction to fetch.
     */
    where: PendingActionWhereUniqueInput
  }

  /**
   * PendingAction findUniqueOrThrow
   */
  export type PendingActionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    /**
     * Filter, which PendingAction to fetch.
     */
    where: PendingActionWhereUniqueInput
  }

  /**
   * PendingAction findFirst
   */
  export type PendingActionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    /**
     * Filter, which PendingAction to fetch.
     */
    where?: PendingActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingActions to fetch.
     */
    orderBy?: PendingActionOrderByWithRelationInput | PendingActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingActions.
     */
    cursor?: PendingActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingActions.
     */
    distinct?: PendingActionScalarFieldEnum | PendingActionScalarFieldEnum[]
  }

  /**
   * PendingAction findFirstOrThrow
   */
  export type PendingActionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    /**
     * Filter, which PendingAction to fetch.
     */
    where?: PendingActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingActions to fetch.
     */
    orderBy?: PendingActionOrderByWithRelationInput | PendingActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingActions.
     */
    cursor?: PendingActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingActions.
     */
    distinct?: PendingActionScalarFieldEnum | PendingActionScalarFieldEnum[]
  }

  /**
   * PendingAction findMany
   */
  export type PendingActionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    /**
     * Filter, which PendingActions to fetch.
     */
    where?: PendingActionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingActions to fetch.
     */
    orderBy?: PendingActionOrderByWithRelationInput | PendingActionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PendingActions.
     */
    cursor?: PendingActionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingActions.
     */
    skip?: number
    distinct?: PendingActionScalarFieldEnum | PendingActionScalarFieldEnum[]
  }

  /**
   * PendingAction create
   */
  export type PendingActionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    /**
     * The data needed to create a PendingAction.
     */
    data: XOR<PendingActionCreateInput, PendingActionUncheckedCreateInput>
  }

  /**
   * PendingAction createMany
   */
  export type PendingActionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PendingActions.
     */
    data: PendingActionCreateManyInput | PendingActionCreateManyInput[]
  }

  /**
   * PendingAction createManyAndReturn
   */
  export type PendingActionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * The data used to create many PendingActions.
     */
    data: PendingActionCreateManyInput | PendingActionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PendingAction update
   */
  export type PendingActionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    /**
     * The data needed to update a PendingAction.
     */
    data: XOR<PendingActionUpdateInput, PendingActionUncheckedUpdateInput>
    /**
     * Choose, which PendingAction to update.
     */
    where: PendingActionWhereUniqueInput
  }

  /**
   * PendingAction updateMany
   */
  export type PendingActionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PendingActions.
     */
    data: XOR<PendingActionUpdateManyMutationInput, PendingActionUncheckedUpdateManyInput>
    /**
     * Filter which PendingActions to update
     */
    where?: PendingActionWhereInput
    /**
     * Limit how many PendingActions to update.
     */
    limit?: number
  }

  /**
   * PendingAction updateManyAndReturn
   */
  export type PendingActionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * The data used to update PendingActions.
     */
    data: XOR<PendingActionUpdateManyMutationInput, PendingActionUncheckedUpdateManyInput>
    /**
     * Filter which PendingActions to update
     */
    where?: PendingActionWhereInput
    /**
     * Limit how many PendingActions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PendingAction upsert
   */
  export type PendingActionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    /**
     * The filter to search for the PendingAction to update in case it exists.
     */
    where: PendingActionWhereUniqueInput
    /**
     * In case the PendingAction found by the `where` argument doesn't exist, create a new PendingAction with this data.
     */
    create: XOR<PendingActionCreateInput, PendingActionUncheckedCreateInput>
    /**
     * In case the PendingAction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendingActionUpdateInput, PendingActionUncheckedUpdateInput>
  }

  /**
   * PendingAction delete
   */
  export type PendingActionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
    /**
     * Filter which PendingAction to delete.
     */
    where: PendingActionWhereUniqueInput
  }

  /**
   * PendingAction deleteMany
   */
  export type PendingActionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingActions to delete
     */
    where?: PendingActionWhereInput
    /**
     * Limit how many PendingActions to delete.
     */
    limit?: number
  }

  /**
   * PendingAction without action
   */
  export type PendingActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingAction
     */
    select?: PendingActionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PendingAction
     */
    omit?: PendingActionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingActionInclude<ExtArgs> | null
  }


  /**
   * Model AgentMemory
   */

  export type AggregateAgentMemory = {
    _count: AgentMemoryCountAggregateOutputType | null
    _min: AgentMemoryMinAggregateOutputType | null
    _max: AgentMemoryMaxAggregateOutputType | null
  }

  export type AgentMemoryMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AgentMemoryMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AgentMemoryCountAggregateOutputType = {
    id: number
    agentId: number
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type AgentMemoryMinAggregateInputType = {
    id?: true
    agentId?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AgentMemoryMaxAggregateInputType = {
    id?: true
    agentId?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AgentMemoryCountAggregateInputType = {
    id?: true
    agentId?: true
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type AgentMemoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentMemory to aggregate.
     */
    where?: AgentMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentMemories to fetch.
     */
    orderBy?: AgentMemoryOrderByWithRelationInput | AgentMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AgentMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AgentMemories
    **/
    _count?: true | AgentMemoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMemoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMemoryMaxAggregateInputType
  }

  export type GetAgentMemoryAggregateType<T extends AgentMemoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAgentMemory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgentMemory[P]>
      : GetScalarType<T[P], AggregateAgentMemory[P]>
  }




  export type AgentMemoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AgentMemoryWhereInput
    orderBy?: AgentMemoryOrderByWithAggregationInput | AgentMemoryOrderByWithAggregationInput[]
    by: AgentMemoryScalarFieldEnum[] | AgentMemoryScalarFieldEnum
    having?: AgentMemoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentMemoryCountAggregateInputType | true
    _min?: AgentMemoryMinAggregateInputType
    _max?: AgentMemoryMaxAggregateInputType
  }

  export type AgentMemoryGroupByOutputType = {
    id: string
    agentId: string
    key: string
    value: string
    updatedAt: Date
    _count: AgentMemoryCountAggregateOutputType | null
    _min: AgentMemoryMinAggregateOutputType | null
    _max: AgentMemoryMaxAggregateOutputType | null
  }

  type GetAgentMemoryGroupByPayload<T extends AgentMemoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentMemoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentMemoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentMemoryGroupByOutputType[P]>
            : GetScalarType<T[P], AgentMemoryGroupByOutputType[P]>
        }
      >
    >


  export type AgentMemorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentMemory"]>

  export type AgentMemorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentMemory"]>

  export type AgentMemorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agentMemory"]>

  export type AgentMemorySelectScalar = {
    id?: boolean
    agentId?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }

  export type AgentMemoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "key" | "value" | "updatedAt", ExtArgs["result"]["agentMemory"]>
  export type AgentMemoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type AgentMemoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type AgentMemoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $AgentMemoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AgentMemory"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["agentMemory"]>
    composites: {}
  }

  type AgentMemoryGetPayload<S extends boolean | null | undefined | AgentMemoryDefaultArgs> = $Result.GetResult<Prisma.$AgentMemoryPayload, S>

  type AgentMemoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AgentMemoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentMemoryCountAggregateInputType | true
    }

  export interface AgentMemoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AgentMemory'], meta: { name: 'AgentMemory' } }
    /**
     * Find zero or one AgentMemory that matches the filter.
     * @param {AgentMemoryFindUniqueArgs} args - Arguments to find a AgentMemory
     * @example
     * // Get one AgentMemory
     * const agentMemory = await prisma.agentMemory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AgentMemoryFindUniqueArgs>(args: SelectSubset<T, AgentMemoryFindUniqueArgs<ExtArgs>>): Prisma__AgentMemoryClient<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AgentMemory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AgentMemoryFindUniqueOrThrowArgs} args - Arguments to find a AgentMemory
     * @example
     * // Get one AgentMemory
     * const agentMemory = await prisma.agentMemory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AgentMemoryFindUniqueOrThrowArgs>(args: SelectSubset<T, AgentMemoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AgentMemoryClient<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentMemory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMemoryFindFirstArgs} args - Arguments to find a AgentMemory
     * @example
     * // Get one AgentMemory
     * const agentMemory = await prisma.agentMemory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AgentMemoryFindFirstArgs>(args?: SelectSubset<T, AgentMemoryFindFirstArgs<ExtArgs>>): Prisma__AgentMemoryClient<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AgentMemory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMemoryFindFirstOrThrowArgs} args - Arguments to find a AgentMemory
     * @example
     * // Get one AgentMemory
     * const agentMemory = await prisma.agentMemory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AgentMemoryFindFirstOrThrowArgs>(args?: SelectSubset<T, AgentMemoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AgentMemoryClient<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AgentMemories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMemoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AgentMemories
     * const agentMemories = await prisma.agentMemory.findMany()
     * 
     * // Get first 10 AgentMemories
     * const agentMemories = await prisma.agentMemory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentMemoryWithIdOnly = await prisma.agentMemory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AgentMemoryFindManyArgs>(args?: SelectSubset<T, AgentMemoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AgentMemory.
     * @param {AgentMemoryCreateArgs} args - Arguments to create a AgentMemory.
     * @example
     * // Create one AgentMemory
     * const AgentMemory = await prisma.agentMemory.create({
     *   data: {
     *     // ... data to create a AgentMemory
     *   }
     * })
     * 
     */
    create<T extends AgentMemoryCreateArgs>(args: SelectSubset<T, AgentMemoryCreateArgs<ExtArgs>>): Prisma__AgentMemoryClient<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AgentMemories.
     * @param {AgentMemoryCreateManyArgs} args - Arguments to create many AgentMemories.
     * @example
     * // Create many AgentMemories
     * const agentMemory = await prisma.agentMemory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AgentMemoryCreateManyArgs>(args?: SelectSubset<T, AgentMemoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AgentMemories and returns the data saved in the database.
     * @param {AgentMemoryCreateManyAndReturnArgs} args - Arguments to create many AgentMemories.
     * @example
     * // Create many AgentMemories
     * const agentMemory = await prisma.agentMemory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AgentMemories and only return the `id`
     * const agentMemoryWithIdOnly = await prisma.agentMemory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AgentMemoryCreateManyAndReturnArgs>(args?: SelectSubset<T, AgentMemoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AgentMemory.
     * @param {AgentMemoryDeleteArgs} args - Arguments to delete one AgentMemory.
     * @example
     * // Delete one AgentMemory
     * const AgentMemory = await prisma.agentMemory.delete({
     *   where: {
     *     // ... filter to delete one AgentMemory
     *   }
     * })
     * 
     */
    delete<T extends AgentMemoryDeleteArgs>(args: SelectSubset<T, AgentMemoryDeleteArgs<ExtArgs>>): Prisma__AgentMemoryClient<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AgentMemory.
     * @param {AgentMemoryUpdateArgs} args - Arguments to update one AgentMemory.
     * @example
     * // Update one AgentMemory
     * const agentMemory = await prisma.agentMemory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AgentMemoryUpdateArgs>(args: SelectSubset<T, AgentMemoryUpdateArgs<ExtArgs>>): Prisma__AgentMemoryClient<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AgentMemories.
     * @param {AgentMemoryDeleteManyArgs} args - Arguments to filter AgentMemories to delete.
     * @example
     * // Delete a few AgentMemories
     * const { count } = await prisma.agentMemory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AgentMemoryDeleteManyArgs>(args?: SelectSubset<T, AgentMemoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentMemories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMemoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AgentMemories
     * const agentMemory = await prisma.agentMemory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AgentMemoryUpdateManyArgs>(args: SelectSubset<T, AgentMemoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AgentMemories and returns the data updated in the database.
     * @param {AgentMemoryUpdateManyAndReturnArgs} args - Arguments to update many AgentMemories.
     * @example
     * // Update many AgentMemories
     * const agentMemory = await prisma.agentMemory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AgentMemories and only return the `id`
     * const agentMemoryWithIdOnly = await prisma.agentMemory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AgentMemoryUpdateManyAndReturnArgs>(args: SelectSubset<T, AgentMemoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AgentMemory.
     * @param {AgentMemoryUpsertArgs} args - Arguments to update or create a AgentMemory.
     * @example
     * // Update or create a AgentMemory
     * const agentMemory = await prisma.agentMemory.upsert({
     *   create: {
     *     // ... data to create a AgentMemory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AgentMemory we want to update
     *   }
     * })
     */
    upsert<T extends AgentMemoryUpsertArgs>(args: SelectSubset<T, AgentMemoryUpsertArgs<ExtArgs>>): Prisma__AgentMemoryClient<$Result.GetResult<Prisma.$AgentMemoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AgentMemories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMemoryCountArgs} args - Arguments to filter AgentMemories to count.
     * @example
     * // Count the number of AgentMemories
     * const count = await prisma.agentMemory.count({
     *   where: {
     *     // ... the filter for the AgentMemories we want to count
     *   }
     * })
    **/
    count<T extends AgentMemoryCountArgs>(
      args?: Subset<T, AgentMemoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentMemoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AgentMemory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMemoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AgentMemoryAggregateArgs>(args: Subset<T, AgentMemoryAggregateArgs>): Prisma.PrismaPromise<GetAgentMemoryAggregateType<T>>

    /**
     * Group by AgentMemory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentMemoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AgentMemoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AgentMemoryGroupByArgs['orderBy'] }
        : { orderBy?: AgentMemoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AgentMemoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentMemoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AgentMemory model
   */
  readonly fields: AgentMemoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AgentMemory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AgentMemoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AgentMemory model
   */
  interface AgentMemoryFieldRefs {
    readonly id: FieldRef<"AgentMemory", 'String'>
    readonly agentId: FieldRef<"AgentMemory", 'String'>
    readonly key: FieldRef<"AgentMemory", 'String'>
    readonly value: FieldRef<"AgentMemory", 'String'>
    readonly updatedAt: FieldRef<"AgentMemory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AgentMemory findUnique
   */
  export type AgentMemoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    /**
     * Filter, which AgentMemory to fetch.
     */
    where: AgentMemoryWhereUniqueInput
  }

  /**
   * AgentMemory findUniqueOrThrow
   */
  export type AgentMemoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    /**
     * Filter, which AgentMemory to fetch.
     */
    where: AgentMemoryWhereUniqueInput
  }

  /**
   * AgentMemory findFirst
   */
  export type AgentMemoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    /**
     * Filter, which AgentMemory to fetch.
     */
    where?: AgentMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentMemories to fetch.
     */
    orderBy?: AgentMemoryOrderByWithRelationInput | AgentMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentMemories.
     */
    cursor?: AgentMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentMemories.
     */
    distinct?: AgentMemoryScalarFieldEnum | AgentMemoryScalarFieldEnum[]
  }

  /**
   * AgentMemory findFirstOrThrow
   */
  export type AgentMemoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    /**
     * Filter, which AgentMemory to fetch.
     */
    where?: AgentMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentMemories to fetch.
     */
    orderBy?: AgentMemoryOrderByWithRelationInput | AgentMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AgentMemories.
     */
    cursor?: AgentMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentMemories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AgentMemories.
     */
    distinct?: AgentMemoryScalarFieldEnum | AgentMemoryScalarFieldEnum[]
  }

  /**
   * AgentMemory findMany
   */
  export type AgentMemoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    /**
     * Filter, which AgentMemories to fetch.
     */
    where?: AgentMemoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AgentMemories to fetch.
     */
    orderBy?: AgentMemoryOrderByWithRelationInput | AgentMemoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AgentMemories.
     */
    cursor?: AgentMemoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AgentMemories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AgentMemories.
     */
    skip?: number
    distinct?: AgentMemoryScalarFieldEnum | AgentMemoryScalarFieldEnum[]
  }

  /**
   * AgentMemory create
   */
  export type AgentMemoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    /**
     * The data needed to create a AgentMemory.
     */
    data: XOR<AgentMemoryCreateInput, AgentMemoryUncheckedCreateInput>
  }

  /**
   * AgentMemory createMany
   */
  export type AgentMemoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AgentMemories.
     */
    data: AgentMemoryCreateManyInput | AgentMemoryCreateManyInput[]
  }

  /**
   * AgentMemory createManyAndReturn
   */
  export type AgentMemoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * The data used to create many AgentMemories.
     */
    data: AgentMemoryCreateManyInput | AgentMemoryCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentMemory update
   */
  export type AgentMemoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    /**
     * The data needed to update a AgentMemory.
     */
    data: XOR<AgentMemoryUpdateInput, AgentMemoryUncheckedUpdateInput>
    /**
     * Choose, which AgentMemory to update.
     */
    where: AgentMemoryWhereUniqueInput
  }

  /**
   * AgentMemory updateMany
   */
  export type AgentMemoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AgentMemories.
     */
    data: XOR<AgentMemoryUpdateManyMutationInput, AgentMemoryUncheckedUpdateManyInput>
    /**
     * Filter which AgentMemories to update
     */
    where?: AgentMemoryWhereInput
    /**
     * Limit how many AgentMemories to update.
     */
    limit?: number
  }

  /**
   * AgentMemory updateManyAndReturn
   */
  export type AgentMemoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * The data used to update AgentMemories.
     */
    data: XOR<AgentMemoryUpdateManyMutationInput, AgentMemoryUncheckedUpdateManyInput>
    /**
     * Filter which AgentMemories to update
     */
    where?: AgentMemoryWhereInput
    /**
     * Limit how many AgentMemories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AgentMemory upsert
   */
  export type AgentMemoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    /**
     * The filter to search for the AgentMemory to update in case it exists.
     */
    where: AgentMemoryWhereUniqueInput
    /**
     * In case the AgentMemory found by the `where` argument doesn't exist, create a new AgentMemory with this data.
     */
    create: XOR<AgentMemoryCreateInput, AgentMemoryUncheckedCreateInput>
    /**
     * In case the AgentMemory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AgentMemoryUpdateInput, AgentMemoryUncheckedUpdateInput>
  }

  /**
   * AgentMemory delete
   */
  export type AgentMemoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
    /**
     * Filter which AgentMemory to delete.
     */
    where: AgentMemoryWhereUniqueInput
  }

  /**
   * AgentMemory deleteMany
   */
  export type AgentMemoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AgentMemories to delete
     */
    where?: AgentMemoryWhereInput
    /**
     * Limit how many AgentMemories to delete.
     */
    limit?: number
  }

  /**
   * AgentMemory without action
   */
  export type AgentMemoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentMemory
     */
    select?: AgentMemorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the AgentMemory
     */
    omit?: AgentMemoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AgentMemoryInclude<ExtArgs> | null
  }


  /**
   * Model KnowledgeBase
   */

  export type AggregateKnowledgeBase = {
    _count: KnowledgeBaseCountAggregateOutputType | null
    _min: KnowledgeBaseMinAggregateOutputType | null
    _max: KnowledgeBaseMaxAggregateOutputType | null
  }

  export type KnowledgeBaseMinAggregateOutputType = {
    id: string | null
    agentId: string | null
    fileName: string | null
    fileUrl: string | null
    vectorNamespace: string | null
    createdAt: Date | null
  }

  export type KnowledgeBaseMaxAggregateOutputType = {
    id: string | null
    agentId: string | null
    fileName: string | null
    fileUrl: string | null
    vectorNamespace: string | null
    createdAt: Date | null
  }

  export type KnowledgeBaseCountAggregateOutputType = {
    id: number
    agentId: number
    fileName: number
    fileUrl: number
    vectorNamespace: number
    createdAt: number
    _all: number
  }


  export type KnowledgeBaseMinAggregateInputType = {
    id?: true
    agentId?: true
    fileName?: true
    fileUrl?: true
    vectorNamespace?: true
    createdAt?: true
  }

  export type KnowledgeBaseMaxAggregateInputType = {
    id?: true
    agentId?: true
    fileName?: true
    fileUrl?: true
    vectorNamespace?: true
    createdAt?: true
  }

  export type KnowledgeBaseCountAggregateInputType = {
    id?: true
    agentId?: true
    fileName?: true
    fileUrl?: true
    vectorNamespace?: true
    createdAt?: true
    _all?: true
  }

  export type KnowledgeBaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeBase to aggregate.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KnowledgeBases
    **/
    _count?: true | KnowledgeBaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KnowledgeBaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KnowledgeBaseMaxAggregateInputType
  }

  export type GetKnowledgeBaseAggregateType<T extends KnowledgeBaseAggregateArgs> = {
        [P in keyof T & keyof AggregateKnowledgeBase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKnowledgeBase[P]>
      : GetScalarType<T[P], AggregateKnowledgeBase[P]>
  }




  export type KnowledgeBaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KnowledgeBaseWhereInput
    orderBy?: KnowledgeBaseOrderByWithAggregationInput | KnowledgeBaseOrderByWithAggregationInput[]
    by: KnowledgeBaseScalarFieldEnum[] | KnowledgeBaseScalarFieldEnum
    having?: KnowledgeBaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KnowledgeBaseCountAggregateInputType | true
    _min?: KnowledgeBaseMinAggregateInputType
    _max?: KnowledgeBaseMaxAggregateInputType
  }

  export type KnowledgeBaseGroupByOutputType = {
    id: string
    agentId: string
    fileName: string
    fileUrl: string
    vectorNamespace: string
    createdAt: Date
    _count: KnowledgeBaseCountAggregateOutputType | null
    _min: KnowledgeBaseMinAggregateOutputType | null
    _max: KnowledgeBaseMaxAggregateOutputType | null
  }

  type GetKnowledgeBaseGroupByPayload<T extends KnowledgeBaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KnowledgeBaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KnowledgeBaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KnowledgeBaseGroupByOutputType[P]>
            : GetScalarType<T[P], KnowledgeBaseGroupByOutputType[P]>
        }
      >
    >


  export type KnowledgeBaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    vectorNamespace?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["knowledgeBase"]>

  export type KnowledgeBaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    vectorNamespace?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["knowledgeBase"]>

  export type KnowledgeBaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    agentId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    vectorNamespace?: boolean
    createdAt?: boolean
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["knowledgeBase"]>

  export type KnowledgeBaseSelectScalar = {
    id?: boolean
    agentId?: boolean
    fileName?: boolean
    fileUrl?: boolean
    vectorNamespace?: boolean
    createdAt?: boolean
  }

  export type KnowledgeBaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "agentId" | "fileName" | "fileUrl" | "vectorNamespace" | "createdAt", ExtArgs["result"]["knowledgeBase"]>
  export type KnowledgeBaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type KnowledgeBaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }
  export type KnowledgeBaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agent?: boolean | AgentDefaultArgs<ExtArgs>
  }

  export type $KnowledgeBasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KnowledgeBase"
    objects: {
      agent: Prisma.$AgentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      agentId: string
      fileName: string
      fileUrl: string
      vectorNamespace: string
      createdAt: Date
    }, ExtArgs["result"]["knowledgeBase"]>
    composites: {}
  }

  type KnowledgeBaseGetPayload<S extends boolean | null | undefined | KnowledgeBaseDefaultArgs> = $Result.GetResult<Prisma.$KnowledgeBasePayload, S>

  type KnowledgeBaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KnowledgeBaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KnowledgeBaseCountAggregateInputType | true
    }

  export interface KnowledgeBaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KnowledgeBase'], meta: { name: 'KnowledgeBase' } }
    /**
     * Find zero or one KnowledgeBase that matches the filter.
     * @param {KnowledgeBaseFindUniqueArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KnowledgeBaseFindUniqueArgs>(args: SelectSubset<T, KnowledgeBaseFindUniqueArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KnowledgeBase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KnowledgeBaseFindUniqueOrThrowArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KnowledgeBaseFindUniqueOrThrowArgs>(args: SelectSubset<T, KnowledgeBaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeBase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseFindFirstArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KnowledgeBaseFindFirstArgs>(args?: SelectSubset<T, KnowledgeBaseFindFirstArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeBase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseFindFirstOrThrowArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KnowledgeBaseFindFirstOrThrowArgs>(args?: SelectSubset<T, KnowledgeBaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KnowledgeBases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KnowledgeBases
     * const knowledgeBases = await prisma.knowledgeBase.findMany()
     * 
     * // Get first 10 KnowledgeBases
     * const knowledgeBases = await prisma.knowledgeBase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const knowledgeBaseWithIdOnly = await prisma.knowledgeBase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KnowledgeBaseFindManyArgs>(args?: SelectSubset<T, KnowledgeBaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KnowledgeBase.
     * @param {KnowledgeBaseCreateArgs} args - Arguments to create a KnowledgeBase.
     * @example
     * // Create one KnowledgeBase
     * const KnowledgeBase = await prisma.knowledgeBase.create({
     *   data: {
     *     // ... data to create a KnowledgeBase
     *   }
     * })
     * 
     */
    create<T extends KnowledgeBaseCreateArgs>(args: SelectSubset<T, KnowledgeBaseCreateArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KnowledgeBases.
     * @param {KnowledgeBaseCreateManyArgs} args - Arguments to create many KnowledgeBases.
     * @example
     * // Create many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KnowledgeBaseCreateManyArgs>(args?: SelectSubset<T, KnowledgeBaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KnowledgeBases and returns the data saved in the database.
     * @param {KnowledgeBaseCreateManyAndReturnArgs} args - Arguments to create many KnowledgeBases.
     * @example
     * // Create many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KnowledgeBases and only return the `id`
     * const knowledgeBaseWithIdOnly = await prisma.knowledgeBase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KnowledgeBaseCreateManyAndReturnArgs>(args?: SelectSubset<T, KnowledgeBaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KnowledgeBase.
     * @param {KnowledgeBaseDeleteArgs} args - Arguments to delete one KnowledgeBase.
     * @example
     * // Delete one KnowledgeBase
     * const KnowledgeBase = await prisma.knowledgeBase.delete({
     *   where: {
     *     // ... filter to delete one KnowledgeBase
     *   }
     * })
     * 
     */
    delete<T extends KnowledgeBaseDeleteArgs>(args: SelectSubset<T, KnowledgeBaseDeleteArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KnowledgeBase.
     * @param {KnowledgeBaseUpdateArgs} args - Arguments to update one KnowledgeBase.
     * @example
     * // Update one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KnowledgeBaseUpdateArgs>(args: SelectSubset<T, KnowledgeBaseUpdateArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KnowledgeBases.
     * @param {KnowledgeBaseDeleteManyArgs} args - Arguments to filter KnowledgeBases to delete.
     * @example
     * // Delete a few KnowledgeBases
     * const { count } = await prisma.knowledgeBase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KnowledgeBaseDeleteManyArgs>(args?: SelectSubset<T, KnowledgeBaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeBases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KnowledgeBaseUpdateManyArgs>(args: SelectSubset<T, KnowledgeBaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeBases and returns the data updated in the database.
     * @param {KnowledgeBaseUpdateManyAndReturnArgs} args - Arguments to update many KnowledgeBases.
     * @example
     * // Update many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KnowledgeBases and only return the `id`
     * const knowledgeBaseWithIdOnly = await prisma.knowledgeBase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KnowledgeBaseUpdateManyAndReturnArgs>(args: SelectSubset<T, KnowledgeBaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KnowledgeBase.
     * @param {KnowledgeBaseUpsertArgs} args - Arguments to update or create a KnowledgeBase.
     * @example
     * // Update or create a KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.upsert({
     *   create: {
     *     // ... data to create a KnowledgeBase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KnowledgeBase we want to update
     *   }
     * })
     */
    upsert<T extends KnowledgeBaseUpsertArgs>(args: SelectSubset<T, KnowledgeBaseUpsertArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KnowledgeBases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseCountArgs} args - Arguments to filter KnowledgeBases to count.
     * @example
     * // Count the number of KnowledgeBases
     * const count = await prisma.knowledgeBase.count({
     *   where: {
     *     // ... the filter for the KnowledgeBases we want to count
     *   }
     * })
    **/
    count<T extends KnowledgeBaseCountArgs>(
      args?: Subset<T, KnowledgeBaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KnowledgeBaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KnowledgeBase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KnowledgeBaseAggregateArgs>(args: Subset<T, KnowledgeBaseAggregateArgs>): Prisma.PrismaPromise<GetKnowledgeBaseAggregateType<T>>

    /**
     * Group by KnowledgeBase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KnowledgeBaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KnowledgeBaseGroupByArgs['orderBy'] }
        : { orderBy?: KnowledgeBaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KnowledgeBaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnowledgeBaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KnowledgeBase model
   */
  readonly fields: KnowledgeBaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KnowledgeBase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KnowledgeBaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agent<T extends AgentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AgentDefaultArgs<ExtArgs>>): Prisma__AgentClient<$Result.GetResult<Prisma.$AgentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KnowledgeBase model
   */
  interface KnowledgeBaseFieldRefs {
    readonly id: FieldRef<"KnowledgeBase", 'String'>
    readonly agentId: FieldRef<"KnowledgeBase", 'String'>
    readonly fileName: FieldRef<"KnowledgeBase", 'String'>
    readonly fileUrl: FieldRef<"KnowledgeBase", 'String'>
    readonly vectorNamespace: FieldRef<"KnowledgeBase", 'String'>
    readonly createdAt: FieldRef<"KnowledgeBase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KnowledgeBase findUnique
   */
  export type KnowledgeBaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase findUniqueOrThrow
   */
  export type KnowledgeBaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase findFirst
   */
  export type KnowledgeBaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeBases.
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeBases.
     */
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * KnowledgeBase findFirstOrThrow
   */
  export type KnowledgeBaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeBases.
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeBases.
     */
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * KnowledgeBase findMany
   */
  export type KnowledgeBaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    /**
     * Filter, which KnowledgeBases to fetch.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KnowledgeBases.
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * KnowledgeBase create
   */
  export type KnowledgeBaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    /**
     * The data needed to create a KnowledgeBase.
     */
    data: XOR<KnowledgeBaseCreateInput, KnowledgeBaseUncheckedCreateInput>
  }

  /**
   * KnowledgeBase createMany
   */
  export type KnowledgeBaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KnowledgeBases.
     */
    data: KnowledgeBaseCreateManyInput | KnowledgeBaseCreateManyInput[]
  }

  /**
   * KnowledgeBase createManyAndReturn
   */
  export type KnowledgeBaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data used to create many KnowledgeBases.
     */
    data: KnowledgeBaseCreateManyInput | KnowledgeBaseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KnowledgeBase update
   */
  export type KnowledgeBaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    /**
     * The data needed to update a KnowledgeBase.
     */
    data: XOR<KnowledgeBaseUpdateInput, KnowledgeBaseUncheckedUpdateInput>
    /**
     * Choose, which KnowledgeBase to update.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase updateMany
   */
  export type KnowledgeBaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KnowledgeBases.
     */
    data: XOR<KnowledgeBaseUpdateManyMutationInput, KnowledgeBaseUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeBases to update
     */
    where?: KnowledgeBaseWhereInput
    /**
     * Limit how many KnowledgeBases to update.
     */
    limit?: number
  }

  /**
   * KnowledgeBase updateManyAndReturn
   */
  export type KnowledgeBaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data used to update KnowledgeBases.
     */
    data: XOR<KnowledgeBaseUpdateManyMutationInput, KnowledgeBaseUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeBases to update
     */
    where?: KnowledgeBaseWhereInput
    /**
     * Limit how many KnowledgeBases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * KnowledgeBase upsert
   */
  export type KnowledgeBaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    /**
     * The filter to search for the KnowledgeBase to update in case it exists.
     */
    where: KnowledgeBaseWhereUniqueInput
    /**
     * In case the KnowledgeBase found by the `where` argument doesn't exist, create a new KnowledgeBase with this data.
     */
    create: XOR<KnowledgeBaseCreateInput, KnowledgeBaseUncheckedCreateInput>
    /**
     * In case the KnowledgeBase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KnowledgeBaseUpdateInput, KnowledgeBaseUncheckedUpdateInput>
  }

  /**
   * KnowledgeBase delete
   */
  export type KnowledgeBaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
    /**
     * Filter which KnowledgeBase to delete.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase deleteMany
   */
  export type KnowledgeBaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeBases to delete
     */
    where?: KnowledgeBaseWhereInput
    /**
     * Limit how many KnowledgeBases to delete.
     */
    limit?: number
  }

  /**
   * KnowledgeBase without action
   */
  export type KnowledgeBaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KnowledgeBaseInclude<ExtArgs> | null
  }


  /**
   * Model Suggestion
   */

  export type AggregateSuggestion = {
    _count: SuggestionCountAggregateOutputType | null
    _min: SuggestionMinAggregateOutputType | null
    _max: SuggestionMaxAggregateOutputType | null
  }

  export type SuggestionMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    agentId: string | null
    message: string | null
    dismissed: boolean | null
    createdAt: Date | null
  }

  export type SuggestionMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    agentId: string | null
    message: string | null
    dismissed: boolean | null
    createdAt: Date | null
  }

  export type SuggestionCountAggregateOutputType = {
    id: number
    companyId: number
    agentId: number
    message: number
    dismissed: number
    createdAt: number
    _all: number
  }


  export type SuggestionMinAggregateInputType = {
    id?: true
    companyId?: true
    agentId?: true
    message?: true
    dismissed?: true
    createdAt?: true
  }

  export type SuggestionMaxAggregateInputType = {
    id?: true
    companyId?: true
    agentId?: true
    message?: true
    dismissed?: true
    createdAt?: true
  }

  export type SuggestionCountAggregateInputType = {
    id?: true
    companyId?: true
    agentId?: true
    message?: true
    dismissed?: true
    createdAt?: true
    _all?: true
  }

  export type SuggestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suggestion to aggregate.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suggestions
    **/
    _count?: true | SuggestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuggestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuggestionMaxAggregateInputType
  }

  export type GetSuggestionAggregateType<T extends SuggestionAggregateArgs> = {
        [P in keyof T & keyof AggregateSuggestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuggestion[P]>
      : GetScalarType<T[P], AggregateSuggestion[P]>
  }




  export type SuggestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuggestionWhereInput
    orderBy?: SuggestionOrderByWithAggregationInput | SuggestionOrderByWithAggregationInput[]
    by: SuggestionScalarFieldEnum[] | SuggestionScalarFieldEnum
    having?: SuggestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuggestionCountAggregateInputType | true
    _min?: SuggestionMinAggregateInputType
    _max?: SuggestionMaxAggregateInputType
  }

  export type SuggestionGroupByOutputType = {
    id: string
    companyId: string
    agentId: string
    message: string
    dismissed: boolean
    createdAt: Date
    _count: SuggestionCountAggregateOutputType | null
    _min: SuggestionMinAggregateOutputType | null
    _max: SuggestionMaxAggregateOutputType | null
  }

  type GetSuggestionGroupByPayload<T extends SuggestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuggestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuggestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuggestionGroupByOutputType[P]>
            : GetScalarType<T[P], SuggestionGroupByOutputType[P]>
        }
      >
    >


  export type SuggestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    agentId?: boolean
    message?: boolean
    dismissed?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["suggestion"]>

  export type SuggestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    agentId?: boolean
    message?: boolean
    dismissed?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["suggestion"]>

  export type SuggestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    agentId?: boolean
    message?: boolean
    dismissed?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["suggestion"]>

  export type SuggestionSelectScalar = {
    id?: boolean
    companyId?: boolean
    agentId?: boolean
    message?: boolean
    dismissed?: boolean
    createdAt?: boolean
  }

  export type SuggestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyId" | "agentId" | "message" | "dismissed" | "createdAt", ExtArgs["result"]["suggestion"]>

  export type $SuggestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Suggestion"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyId: string
      agentId: string
      message: string
      dismissed: boolean
      createdAt: Date
    }, ExtArgs["result"]["suggestion"]>
    composites: {}
  }

  type SuggestionGetPayload<S extends boolean | null | undefined | SuggestionDefaultArgs> = $Result.GetResult<Prisma.$SuggestionPayload, S>

  type SuggestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SuggestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SuggestionCountAggregateInputType | true
    }

  export interface SuggestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Suggestion'], meta: { name: 'Suggestion' } }
    /**
     * Find zero or one Suggestion that matches the filter.
     * @param {SuggestionFindUniqueArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuggestionFindUniqueArgs>(args: SelectSubset<T, SuggestionFindUniqueArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Suggestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SuggestionFindUniqueOrThrowArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuggestionFindUniqueOrThrowArgs>(args: SelectSubset<T, SuggestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Suggestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindFirstArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuggestionFindFirstArgs>(args?: SelectSubset<T, SuggestionFindFirstArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Suggestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindFirstOrThrowArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuggestionFindFirstOrThrowArgs>(args?: SelectSubset<T, SuggestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Suggestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suggestions
     * const suggestions = await prisma.suggestion.findMany()
     * 
     * // Get first 10 Suggestions
     * const suggestions = await prisma.suggestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuggestionFindManyArgs>(args?: SelectSubset<T, SuggestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Suggestion.
     * @param {SuggestionCreateArgs} args - Arguments to create a Suggestion.
     * @example
     * // Create one Suggestion
     * const Suggestion = await prisma.suggestion.create({
     *   data: {
     *     // ... data to create a Suggestion
     *   }
     * })
     * 
     */
    create<T extends SuggestionCreateArgs>(args: SelectSubset<T, SuggestionCreateArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Suggestions.
     * @param {SuggestionCreateManyArgs} args - Arguments to create many Suggestions.
     * @example
     * // Create many Suggestions
     * const suggestion = await prisma.suggestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuggestionCreateManyArgs>(args?: SelectSubset<T, SuggestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Suggestions and returns the data saved in the database.
     * @param {SuggestionCreateManyAndReturnArgs} args - Arguments to create many Suggestions.
     * @example
     * // Create many Suggestions
     * const suggestion = await prisma.suggestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Suggestions and only return the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SuggestionCreateManyAndReturnArgs>(args?: SelectSubset<T, SuggestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Suggestion.
     * @param {SuggestionDeleteArgs} args - Arguments to delete one Suggestion.
     * @example
     * // Delete one Suggestion
     * const Suggestion = await prisma.suggestion.delete({
     *   where: {
     *     // ... filter to delete one Suggestion
     *   }
     * })
     * 
     */
    delete<T extends SuggestionDeleteArgs>(args: SelectSubset<T, SuggestionDeleteArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Suggestion.
     * @param {SuggestionUpdateArgs} args - Arguments to update one Suggestion.
     * @example
     * // Update one Suggestion
     * const suggestion = await prisma.suggestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuggestionUpdateArgs>(args: SelectSubset<T, SuggestionUpdateArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Suggestions.
     * @param {SuggestionDeleteManyArgs} args - Arguments to filter Suggestions to delete.
     * @example
     * // Delete a few Suggestions
     * const { count } = await prisma.suggestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuggestionDeleteManyArgs>(args?: SelectSubset<T, SuggestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suggestions
     * const suggestion = await prisma.suggestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuggestionUpdateManyArgs>(args: SelectSubset<T, SuggestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suggestions and returns the data updated in the database.
     * @param {SuggestionUpdateManyAndReturnArgs} args - Arguments to update many Suggestions.
     * @example
     * // Update many Suggestions
     * const suggestion = await prisma.suggestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Suggestions and only return the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SuggestionUpdateManyAndReturnArgs>(args: SelectSubset<T, SuggestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Suggestion.
     * @param {SuggestionUpsertArgs} args - Arguments to update or create a Suggestion.
     * @example
     * // Update or create a Suggestion
     * const suggestion = await prisma.suggestion.upsert({
     *   create: {
     *     // ... data to create a Suggestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Suggestion we want to update
     *   }
     * })
     */
    upsert<T extends SuggestionUpsertArgs>(args: SelectSubset<T, SuggestionUpsertArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Suggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionCountArgs} args - Arguments to filter Suggestions to count.
     * @example
     * // Count the number of Suggestions
     * const count = await prisma.suggestion.count({
     *   where: {
     *     // ... the filter for the Suggestions we want to count
     *   }
     * })
    **/
    count<T extends SuggestionCountArgs>(
      args?: Subset<T, SuggestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuggestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Suggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SuggestionAggregateArgs>(args: Subset<T, SuggestionAggregateArgs>): Prisma.PrismaPromise<GetSuggestionAggregateType<T>>

    /**
     * Group by Suggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SuggestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuggestionGroupByArgs['orderBy'] }
        : { orderBy?: SuggestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SuggestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuggestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Suggestion model
   */
  readonly fields: SuggestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Suggestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuggestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Suggestion model
   */
  interface SuggestionFieldRefs {
    readonly id: FieldRef<"Suggestion", 'String'>
    readonly companyId: FieldRef<"Suggestion", 'String'>
    readonly agentId: FieldRef<"Suggestion", 'String'>
    readonly message: FieldRef<"Suggestion", 'String'>
    readonly dismissed: FieldRef<"Suggestion", 'Boolean'>
    readonly createdAt: FieldRef<"Suggestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Suggestion findUnique
   */
  export type SuggestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion findUniqueOrThrow
   */
  export type SuggestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion findFirst
   */
  export type SuggestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suggestions.
     */
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * Suggestion findFirstOrThrow
   */
  export type SuggestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suggestions.
     */
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * Suggestion findMany
   */
  export type SuggestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Filter, which Suggestions to fetch.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * Suggestion create
   */
  export type SuggestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * The data needed to create a Suggestion.
     */
    data: XOR<SuggestionCreateInput, SuggestionUncheckedCreateInput>
  }

  /**
   * Suggestion createMany
   */
  export type SuggestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suggestions.
     */
    data: SuggestionCreateManyInput | SuggestionCreateManyInput[]
  }

  /**
   * Suggestion createManyAndReturn
   */
  export type SuggestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * The data used to create many Suggestions.
     */
    data: SuggestionCreateManyInput | SuggestionCreateManyInput[]
  }

  /**
   * Suggestion update
   */
  export type SuggestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * The data needed to update a Suggestion.
     */
    data: XOR<SuggestionUpdateInput, SuggestionUncheckedUpdateInput>
    /**
     * Choose, which Suggestion to update.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion updateMany
   */
  export type SuggestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suggestions.
     */
    data: XOR<SuggestionUpdateManyMutationInput, SuggestionUncheckedUpdateManyInput>
    /**
     * Filter which Suggestions to update
     */
    where?: SuggestionWhereInput
    /**
     * Limit how many Suggestions to update.
     */
    limit?: number
  }

  /**
   * Suggestion updateManyAndReturn
   */
  export type SuggestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * The data used to update Suggestions.
     */
    data: XOR<SuggestionUpdateManyMutationInput, SuggestionUncheckedUpdateManyInput>
    /**
     * Filter which Suggestions to update
     */
    where?: SuggestionWhereInput
    /**
     * Limit how many Suggestions to update.
     */
    limit?: number
  }

  /**
   * Suggestion upsert
   */
  export type SuggestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * The filter to search for the Suggestion to update in case it exists.
     */
    where: SuggestionWhereUniqueInput
    /**
     * In case the Suggestion found by the `where` argument doesn't exist, create a new Suggestion with this data.
     */
    create: XOR<SuggestionCreateInput, SuggestionUncheckedCreateInput>
    /**
     * In case the Suggestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuggestionUpdateInput, SuggestionUncheckedUpdateInput>
  }

  /**
   * Suggestion delete
   */
  export type SuggestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Filter which Suggestion to delete.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion deleteMany
   */
  export type SuggestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suggestions to delete
     */
    where?: SuggestionWhereInput
    /**
     * Limit how many Suggestions to delete.
     */
    limit?: number
  }

  /**
   * Suggestion without action
   */
  export type SuggestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    department: 'department',
    role: 'role',
    companyId: 'companyId',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AgentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    department: 'department',
    definition: 'definition',
    status: 'status',
    trigger: 'trigger',
    cronSchedule: 'cronSchedule',
    tools: 'tools',
    guardrails: 'guardrails',
    memoryEnabled: 'memoryEnabled',
    knowledgeNeeded: 'knowledgeNeeded',
    isPublic: 'isPublic',
    userId: 'userId',
    companyId: 'companyId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const AgentRunScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    status: 'status',
    logs: 'logs',
    output: 'output',
    triggeredBy: 'triggeredBy',
    startedAt: 'startedAt',
    endedAt: 'endedAt'
  };

  export type AgentRunScalarFieldEnum = (typeof AgentRunScalarFieldEnum)[keyof typeof AgentRunScalarFieldEnum]


  export const PendingActionScalarFieldEnum: {
    id: 'id',
    runId: 'runId',
    action: 'action',
    status: 'status',
    message: 'message',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PendingActionScalarFieldEnum = (typeof PendingActionScalarFieldEnum)[keyof typeof PendingActionScalarFieldEnum]


  export const AgentMemoryScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type AgentMemoryScalarFieldEnum = (typeof AgentMemoryScalarFieldEnum)[keyof typeof AgentMemoryScalarFieldEnum]


  export const KnowledgeBaseScalarFieldEnum: {
    id: 'id',
    agentId: 'agentId',
    fileName: 'fileName',
    fileUrl: 'fileUrl',
    vectorNamespace: 'vectorNamespace',
    createdAt: 'createdAt'
  };

  export type KnowledgeBaseScalarFieldEnum = (typeof KnowledgeBaseScalarFieldEnum)[keyof typeof KnowledgeBaseScalarFieldEnum]


  export const SuggestionScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    agentId: 'agentId',
    message: 'message',
    dismissed: 'dismissed',
    createdAt: 'createdAt'
  };

  export type SuggestionScalarFieldEnum = (typeof SuggestionScalarFieldEnum)[keyof typeof SuggestionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Department'
   */
  export type EnumDepartmentFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Department'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AgentStatus'
   */
  export type EnumAgentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AgentStatus'>
    


  /**
   * Reference to a field of type 'TriggerType'
   */
  export type EnumTriggerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TriggerType'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'RunStatus'
   */
  export type EnumRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RunStatus'>
    


  /**
   * Reference to a field of type 'PendingActionStatus'
   */
  export type EnumPendingActionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PendingActionStatus'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    agents?: AgentListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    agents?: AgentOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    createdAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserListRelationFilter
    agents?: AgentListRelationFilter
  }, "id" | "name">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    department?: EnumDepartmentFilter<"User"> | $Enums.Department
    role?: EnumRoleFilter<"User"> | $Enums.Role
    companyId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    agents?: AgentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    department?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    agents?: AgentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    department?: EnumDepartmentFilter<"User"> | $Enums.Department
    role?: EnumRoleFilter<"User"> | $Enums.Role
    companyId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    agents?: AgentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    department?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    department?: EnumDepartmentWithAggregatesFilter<"User"> | $Enums.Department
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    companyId?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AgentWhereInput = {
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    id?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    description?: StringFilter<"Agent"> | string
    department?: EnumDepartmentFilter<"Agent"> | $Enums.Department
    definition?: JsonFilter<"Agent">
    status?: EnumAgentStatusFilter<"Agent"> | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFilter<"Agent"> | $Enums.TriggerType
    cronSchedule?: StringNullableFilter<"Agent"> | string | null
    tools?: JsonFilter<"Agent">
    guardrails?: JsonFilter<"Agent">
    memoryEnabled?: BoolFilter<"Agent"> | boolean
    knowledgeNeeded?: BoolFilter<"Agent"> | boolean
    isPublic?: BoolFilter<"Agent"> | boolean
    userId?: StringFilter<"Agent"> | string
    companyId?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    runs?: AgentRunListRelationFilter
    knowledgeBases?: KnowledgeBaseListRelationFilter
    memory?: AgentMemoryListRelationFilter
  }

  export type AgentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    department?: SortOrder
    definition?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    cronSchedule?: SortOrderInput | SortOrder
    tools?: SortOrder
    guardrails?: SortOrder
    memoryEnabled?: SortOrder
    knowledgeNeeded?: SortOrder
    isPublic?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
    runs?: AgentRunOrderByRelationAggregateInput
    knowledgeBases?: KnowledgeBaseOrderByRelationAggregateInput
    memory?: AgentMemoryOrderByRelationAggregateInput
  }

  export type AgentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyId_name_isPublic?: AgentCompanyIdNameIsPublicCompoundUniqueInput
    AND?: AgentWhereInput | AgentWhereInput[]
    OR?: AgentWhereInput[]
    NOT?: AgentWhereInput | AgentWhereInput[]
    name?: StringFilter<"Agent"> | string
    description?: StringFilter<"Agent"> | string
    department?: EnumDepartmentFilter<"Agent"> | $Enums.Department
    definition?: JsonFilter<"Agent">
    status?: EnumAgentStatusFilter<"Agent"> | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFilter<"Agent"> | $Enums.TriggerType
    cronSchedule?: StringNullableFilter<"Agent"> | string | null
    tools?: JsonFilter<"Agent">
    guardrails?: JsonFilter<"Agent">
    memoryEnabled?: BoolFilter<"Agent"> | boolean
    knowledgeNeeded?: BoolFilter<"Agent"> | boolean
    isPublic?: BoolFilter<"Agent"> | boolean
    userId?: StringFilter<"Agent"> | string
    companyId?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    runs?: AgentRunListRelationFilter
    knowledgeBases?: KnowledgeBaseListRelationFilter
    memory?: AgentMemoryListRelationFilter
  }, "id" | "companyId_name_isPublic">

  export type AgentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    department?: SortOrder
    definition?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    cronSchedule?: SortOrderInput | SortOrder
    tools?: SortOrder
    guardrails?: SortOrder
    memoryEnabled?: SortOrder
    knowledgeNeeded?: SortOrder
    isPublic?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentCountOrderByAggregateInput
    _max?: AgentMaxOrderByAggregateInput
    _min?: AgentMinOrderByAggregateInput
  }

  export type AgentScalarWhereWithAggregatesInput = {
    AND?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    OR?: AgentScalarWhereWithAggregatesInput[]
    NOT?: AgentScalarWhereWithAggregatesInput | AgentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Agent"> | string
    name?: StringWithAggregatesFilter<"Agent"> | string
    description?: StringWithAggregatesFilter<"Agent"> | string
    department?: EnumDepartmentWithAggregatesFilter<"Agent"> | $Enums.Department
    definition?: JsonWithAggregatesFilter<"Agent">
    status?: EnumAgentStatusWithAggregatesFilter<"Agent"> | $Enums.AgentStatus
    trigger?: EnumTriggerTypeWithAggregatesFilter<"Agent"> | $Enums.TriggerType
    cronSchedule?: StringNullableWithAggregatesFilter<"Agent"> | string | null
    tools?: JsonWithAggregatesFilter<"Agent">
    guardrails?: JsonWithAggregatesFilter<"Agent">
    memoryEnabled?: BoolWithAggregatesFilter<"Agent"> | boolean
    knowledgeNeeded?: BoolWithAggregatesFilter<"Agent"> | boolean
    isPublic?: BoolWithAggregatesFilter<"Agent"> | boolean
    userId?: StringWithAggregatesFilter<"Agent"> | string
    companyId?: StringWithAggregatesFilter<"Agent"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Agent"> | Date | string
  }

  export type AgentRunWhereInput = {
    AND?: AgentRunWhereInput | AgentRunWhereInput[]
    OR?: AgentRunWhereInput[]
    NOT?: AgentRunWhereInput | AgentRunWhereInput[]
    id?: StringFilter<"AgentRun"> | string
    agentId?: StringFilter<"AgentRun"> | string
    status?: EnumRunStatusFilter<"AgentRun"> | $Enums.RunStatus
    logs?: JsonFilter<"AgentRun">
    output?: StringNullableFilter<"AgentRun"> | string | null
    triggeredBy?: StringFilter<"AgentRun"> | string
    startedAt?: DateTimeFilter<"AgentRun"> | Date | string
    endedAt?: DateTimeNullableFilter<"AgentRun"> | Date | string | null
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    pendingAction?: XOR<PendingActionNullableScalarRelationFilter, PendingActionWhereInput> | null
  }

  export type AgentRunOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    status?: SortOrder
    logs?: SortOrder
    output?: SortOrderInput | SortOrder
    triggeredBy?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    agent?: AgentOrderByWithRelationInput
    pendingAction?: PendingActionOrderByWithRelationInput
  }

  export type AgentRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AgentRunWhereInput | AgentRunWhereInput[]
    OR?: AgentRunWhereInput[]
    NOT?: AgentRunWhereInput | AgentRunWhereInput[]
    agentId?: StringFilter<"AgentRun"> | string
    status?: EnumRunStatusFilter<"AgentRun"> | $Enums.RunStatus
    logs?: JsonFilter<"AgentRun">
    output?: StringNullableFilter<"AgentRun"> | string | null
    triggeredBy?: StringFilter<"AgentRun"> | string
    startedAt?: DateTimeFilter<"AgentRun"> | Date | string
    endedAt?: DateTimeNullableFilter<"AgentRun"> | Date | string | null
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
    pendingAction?: XOR<PendingActionNullableScalarRelationFilter, PendingActionWhereInput> | null
  }, "id">

  export type AgentRunOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    status?: SortOrder
    logs?: SortOrder
    output?: SortOrderInput | SortOrder
    triggeredBy?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    _count?: AgentRunCountOrderByAggregateInput
    _max?: AgentRunMaxOrderByAggregateInput
    _min?: AgentRunMinOrderByAggregateInput
  }

  export type AgentRunScalarWhereWithAggregatesInput = {
    AND?: AgentRunScalarWhereWithAggregatesInput | AgentRunScalarWhereWithAggregatesInput[]
    OR?: AgentRunScalarWhereWithAggregatesInput[]
    NOT?: AgentRunScalarWhereWithAggregatesInput | AgentRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentRun"> | string
    agentId?: StringWithAggregatesFilter<"AgentRun"> | string
    status?: EnumRunStatusWithAggregatesFilter<"AgentRun"> | $Enums.RunStatus
    logs?: JsonWithAggregatesFilter<"AgentRun">
    output?: StringNullableWithAggregatesFilter<"AgentRun"> | string | null
    triggeredBy?: StringWithAggregatesFilter<"AgentRun"> | string
    startedAt?: DateTimeWithAggregatesFilter<"AgentRun"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"AgentRun"> | Date | string | null
  }

  export type PendingActionWhereInput = {
    AND?: PendingActionWhereInput | PendingActionWhereInput[]
    OR?: PendingActionWhereInput[]
    NOT?: PendingActionWhereInput | PendingActionWhereInput[]
    id?: StringFilter<"PendingAction"> | string
    runId?: StringFilter<"PendingAction"> | string
    action?: StringFilter<"PendingAction"> | string
    status?: EnumPendingActionStatusFilter<"PendingAction"> | $Enums.PendingActionStatus
    message?: StringFilter<"PendingAction"> | string
    createdAt?: DateTimeFilter<"PendingAction"> | Date | string
    updatedAt?: DateTimeFilter<"PendingAction"> | Date | string
    run?: XOR<AgentRunScalarRelationFilter, AgentRunWhereInput>
  }

  export type PendingActionOrderByWithRelationInput = {
    id?: SortOrder
    runId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    run?: AgentRunOrderByWithRelationInput
  }

  export type PendingActionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    runId?: string
    AND?: PendingActionWhereInput | PendingActionWhereInput[]
    OR?: PendingActionWhereInput[]
    NOT?: PendingActionWhereInput | PendingActionWhereInput[]
    action?: StringFilter<"PendingAction"> | string
    status?: EnumPendingActionStatusFilter<"PendingAction"> | $Enums.PendingActionStatus
    message?: StringFilter<"PendingAction"> | string
    createdAt?: DateTimeFilter<"PendingAction"> | Date | string
    updatedAt?: DateTimeFilter<"PendingAction"> | Date | string
    run?: XOR<AgentRunScalarRelationFilter, AgentRunWhereInput>
  }, "id" | "runId">

  export type PendingActionOrderByWithAggregationInput = {
    id?: SortOrder
    runId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PendingActionCountOrderByAggregateInput
    _max?: PendingActionMaxOrderByAggregateInput
    _min?: PendingActionMinOrderByAggregateInput
  }

  export type PendingActionScalarWhereWithAggregatesInput = {
    AND?: PendingActionScalarWhereWithAggregatesInput | PendingActionScalarWhereWithAggregatesInput[]
    OR?: PendingActionScalarWhereWithAggregatesInput[]
    NOT?: PendingActionScalarWhereWithAggregatesInput | PendingActionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PendingAction"> | string
    runId?: StringWithAggregatesFilter<"PendingAction"> | string
    action?: StringWithAggregatesFilter<"PendingAction"> | string
    status?: EnumPendingActionStatusWithAggregatesFilter<"PendingAction"> | $Enums.PendingActionStatus
    message?: StringWithAggregatesFilter<"PendingAction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PendingAction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PendingAction"> | Date | string
  }

  export type AgentMemoryWhereInput = {
    AND?: AgentMemoryWhereInput | AgentMemoryWhereInput[]
    OR?: AgentMemoryWhereInput[]
    NOT?: AgentMemoryWhereInput | AgentMemoryWhereInput[]
    id?: StringFilter<"AgentMemory"> | string
    agentId?: StringFilter<"AgentMemory"> | string
    key?: StringFilter<"AgentMemory"> | string
    value?: StringFilter<"AgentMemory"> | string
    updatedAt?: DateTimeFilter<"AgentMemory"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }

  export type AgentMemoryOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type AgentMemoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    agentId_key?: AgentMemoryAgentIdKeyCompoundUniqueInput
    AND?: AgentMemoryWhereInput | AgentMemoryWhereInput[]
    OR?: AgentMemoryWhereInput[]
    NOT?: AgentMemoryWhereInput | AgentMemoryWhereInput[]
    agentId?: StringFilter<"AgentMemory"> | string
    key?: StringFilter<"AgentMemory"> | string
    value?: StringFilter<"AgentMemory"> | string
    updatedAt?: DateTimeFilter<"AgentMemory"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }, "id" | "agentId_key">

  export type AgentMemoryOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: AgentMemoryCountOrderByAggregateInput
    _max?: AgentMemoryMaxOrderByAggregateInput
    _min?: AgentMemoryMinOrderByAggregateInput
  }

  export type AgentMemoryScalarWhereWithAggregatesInput = {
    AND?: AgentMemoryScalarWhereWithAggregatesInput | AgentMemoryScalarWhereWithAggregatesInput[]
    OR?: AgentMemoryScalarWhereWithAggregatesInput[]
    NOT?: AgentMemoryScalarWhereWithAggregatesInput | AgentMemoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AgentMemory"> | string
    agentId?: StringWithAggregatesFilter<"AgentMemory"> | string
    key?: StringWithAggregatesFilter<"AgentMemory"> | string
    value?: StringWithAggregatesFilter<"AgentMemory"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"AgentMemory"> | Date | string
  }

  export type KnowledgeBaseWhereInput = {
    AND?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    OR?: KnowledgeBaseWhereInput[]
    NOT?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    id?: StringFilter<"KnowledgeBase"> | string
    agentId?: StringFilter<"KnowledgeBase"> | string
    fileName?: StringFilter<"KnowledgeBase"> | string
    fileUrl?: StringFilter<"KnowledgeBase"> | string
    vectorNamespace?: StringFilter<"KnowledgeBase"> | string
    createdAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }

  export type KnowledgeBaseOrderByWithRelationInput = {
    id?: SortOrder
    agentId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    vectorNamespace?: SortOrder
    createdAt?: SortOrder
    agent?: AgentOrderByWithRelationInput
  }

  export type KnowledgeBaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    OR?: KnowledgeBaseWhereInput[]
    NOT?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    agentId?: StringFilter<"KnowledgeBase"> | string
    fileName?: StringFilter<"KnowledgeBase"> | string
    fileUrl?: StringFilter<"KnowledgeBase"> | string
    vectorNamespace?: StringFilter<"KnowledgeBase"> | string
    createdAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
    agent?: XOR<AgentScalarRelationFilter, AgentWhereInput>
  }, "id">

  export type KnowledgeBaseOrderByWithAggregationInput = {
    id?: SortOrder
    agentId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    vectorNamespace?: SortOrder
    createdAt?: SortOrder
    _count?: KnowledgeBaseCountOrderByAggregateInput
    _max?: KnowledgeBaseMaxOrderByAggregateInput
    _min?: KnowledgeBaseMinOrderByAggregateInput
  }

  export type KnowledgeBaseScalarWhereWithAggregatesInput = {
    AND?: KnowledgeBaseScalarWhereWithAggregatesInput | KnowledgeBaseScalarWhereWithAggregatesInput[]
    OR?: KnowledgeBaseScalarWhereWithAggregatesInput[]
    NOT?: KnowledgeBaseScalarWhereWithAggregatesInput | KnowledgeBaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    agentId?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    fileName?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    fileUrl?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    vectorNamespace?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    createdAt?: DateTimeWithAggregatesFilter<"KnowledgeBase"> | Date | string
  }

  export type SuggestionWhereInput = {
    AND?: SuggestionWhereInput | SuggestionWhereInput[]
    OR?: SuggestionWhereInput[]
    NOT?: SuggestionWhereInput | SuggestionWhereInput[]
    id?: StringFilter<"Suggestion"> | string
    companyId?: StringFilter<"Suggestion"> | string
    agentId?: StringFilter<"Suggestion"> | string
    message?: StringFilter<"Suggestion"> | string
    dismissed?: BoolFilter<"Suggestion"> | boolean
    createdAt?: DateTimeFilter<"Suggestion"> | Date | string
  }

  export type SuggestionOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    agentId?: SortOrder
    message?: SortOrder
    dismissed?: SortOrder
    createdAt?: SortOrder
  }

  export type SuggestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SuggestionWhereInput | SuggestionWhereInput[]
    OR?: SuggestionWhereInput[]
    NOT?: SuggestionWhereInput | SuggestionWhereInput[]
    companyId?: StringFilter<"Suggestion"> | string
    agentId?: StringFilter<"Suggestion"> | string
    message?: StringFilter<"Suggestion"> | string
    dismissed?: BoolFilter<"Suggestion"> | boolean
    createdAt?: DateTimeFilter<"Suggestion"> | Date | string
  }, "id">

  export type SuggestionOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    agentId?: SortOrder
    message?: SortOrder
    dismissed?: SortOrder
    createdAt?: SortOrder
    _count?: SuggestionCountOrderByAggregateInput
    _max?: SuggestionMaxOrderByAggregateInput
    _min?: SuggestionMinOrderByAggregateInput
  }

  export type SuggestionScalarWhereWithAggregatesInput = {
    AND?: SuggestionScalarWhereWithAggregatesInput | SuggestionScalarWhereWithAggregatesInput[]
    OR?: SuggestionScalarWhereWithAggregatesInput[]
    NOT?: SuggestionScalarWhereWithAggregatesInput | SuggestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Suggestion"> | string
    companyId?: StringWithAggregatesFilter<"Suggestion"> | string
    agentId?: StringWithAggregatesFilter<"Suggestion"> | string
    message?: StringWithAggregatesFilter<"Suggestion"> | string
    dismissed?: BoolWithAggregatesFilter<"Suggestion"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Suggestion"> | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
    agents?: AgentCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
    agents?: AgentUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
    agents?: AgentUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
    agents?: AgentUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    department: $Enums.Department
    role?: $Enums.Role
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
    agents?: AgentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    department: $Enums.Department
    role?: $Enums.Role
    companyId: string
    createdAt?: Date | string
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
    agents?: AgentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    department: $Enums.Department
    role?: $Enums.Role
    companyId: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCreateInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAgentsInput
    company: CompanyCreateNestedOneWithoutAgentsInput
    runs?: AgentRunCreateNestedManyWithoutAgentInput
    knowledgeBases?: KnowledgeBaseCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId: string
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: AgentRunUncheckedCreateNestedManyWithoutAgentInput
    knowledgeBases?: KnowledgeBaseUncheckedCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentsNestedInput
    company?: CompanyUpdateOneRequiredWithoutAgentsNestedInput
    runs?: AgentRunUpdateManyWithoutAgentNestedInput
    knowledgeBases?: KnowledgeBaseUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: AgentRunUncheckedUpdateManyWithoutAgentNestedInput
    knowledgeBases?: KnowledgeBaseUncheckedUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateManyInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId: string
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunCreateInput = {
    id?: string
    status: $Enums.RunStatus
    logs: JsonNullValueInput | InputJsonValue
    output?: string | null
    triggeredBy: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    agent: AgentCreateNestedOneWithoutRunsInput
    pendingAction?: PendingActionCreateNestedOneWithoutRunInput
  }

  export type AgentRunUncheckedCreateInput = {
    id?: string
    agentId: string
    status: $Enums.RunStatus
    logs: JsonNullValueInput | InputJsonValue
    output?: string | null
    triggeredBy: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    pendingAction?: PendingActionUncheckedCreateNestedOneWithoutRunInput
  }

  export type AgentRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    logs?: JsonNullValueInput | InputJsonValue
    output?: NullableStringFieldUpdateOperationsInput | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent?: AgentUpdateOneRequiredWithoutRunsNestedInput
    pendingAction?: PendingActionUpdateOneWithoutRunNestedInput
  }

  export type AgentRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    logs?: JsonNullValueInput | InputJsonValue
    output?: NullableStringFieldUpdateOperationsInput | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pendingAction?: PendingActionUncheckedUpdateOneWithoutRunNestedInput
  }

  export type AgentRunCreateManyInput = {
    id?: string
    agentId: string
    status: $Enums.RunStatus
    logs: JsonNullValueInput | InputJsonValue
    output?: string | null
    triggeredBy: string
    startedAt?: Date | string
    endedAt?: Date | string | null
  }

  export type AgentRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    logs?: JsonNullValueInput | InputJsonValue
    output?: NullableStringFieldUpdateOperationsInput | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AgentRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    logs?: JsonNullValueInput | InputJsonValue
    output?: NullableStringFieldUpdateOperationsInput | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PendingActionCreateInput = {
    id?: string
    action: string
    status?: $Enums.PendingActionStatus
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
    run: AgentRunCreateNestedOneWithoutPendingActionInput
  }

  export type PendingActionUncheckedCreateInput = {
    id?: string
    runId: string
    action: string
    status?: $Enums.PendingActionStatus
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendingActionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPendingActionStatusFieldUpdateOperationsInput | $Enums.PendingActionStatus
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    run?: AgentRunUpdateOneRequiredWithoutPendingActionNestedInput
  }

  export type PendingActionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPendingActionStatusFieldUpdateOperationsInput | $Enums.PendingActionStatus
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingActionCreateManyInput = {
    id?: string
    runId: string
    action: string
    status?: $Enums.PendingActionStatus
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendingActionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPendingActionStatusFieldUpdateOperationsInput | $Enums.PendingActionStatus
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingActionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    runId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPendingActionStatusFieldUpdateOperationsInput | $Enums.PendingActionStatus
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMemoryCreateInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
    agent: AgentCreateNestedOneWithoutMemoryInput
  }

  export type AgentMemoryUncheckedCreateInput = {
    id?: string
    agentId: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AgentMemoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutMemoryNestedInput
  }

  export type AgentMemoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMemoryCreateManyInput = {
    id?: string
    agentId: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AgentMemoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMemoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseCreateInput = {
    id?: string
    fileName: string
    fileUrl: string
    vectorNamespace: string
    createdAt?: Date | string
    agent: AgentCreateNestedOneWithoutKnowledgeBasesInput
  }

  export type KnowledgeBaseUncheckedCreateInput = {
    id?: string
    agentId: string
    fileName: string
    fileUrl: string
    vectorNamespace: string
    createdAt?: Date | string
  }

  export type KnowledgeBaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    vectorNamespace?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agent?: AgentUpdateOneRequiredWithoutKnowledgeBasesNestedInput
  }

  export type KnowledgeBaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    vectorNamespace?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseCreateManyInput = {
    id?: string
    agentId: string
    fileName: string
    fileUrl: string
    vectorNamespace: string
    createdAt?: Date | string
  }

  export type KnowledgeBaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    vectorNamespace?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    vectorNamespace?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionCreateInput = {
    id?: string
    companyId: string
    agentId: string
    message: string
    dismissed?: boolean
    createdAt?: Date | string
  }

  export type SuggestionUncheckedCreateInput = {
    id?: string
    companyId: string
    agentId: string
    message: string
    dismissed?: boolean
    createdAt?: Date | string
  }

  export type SuggestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    dismissed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    dismissed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionCreateManyInput = {
    id?: string
    companyId: string
    agentId: string
    message: string
    dismissed?: boolean
    createdAt?: Date | string
  }

  export type SuggestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    dismissed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    dismissed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type AgentListRelationFilter = {
    every?: AgentWhereInput
    some?: AgentWhereInput
    none?: AgentWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumDepartmentFilter<$PrismaModel = never> = {
    equals?: $Enums.Department | EnumDepartmentFieldRefInput<$PrismaModel>
    in?: $Enums.Department[]
    notIn?: $Enums.Department[]
    not?: NestedEnumDepartmentFilter<$PrismaModel> | $Enums.Department
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    department?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    department?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    department?: SortOrder
    role?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumDepartmentWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Department | EnumDepartmentFieldRefInput<$PrismaModel>
    in?: $Enums.Department[]
    notIn?: $Enums.Department[]
    not?: NestedEnumDepartmentWithAggregatesFilter<$PrismaModel> | $Enums.Department
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDepartmentFilter<$PrismaModel>
    _max?: NestedEnumDepartmentFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumAgentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[]
    notIn?: $Enums.AgentStatus[]
    not?: NestedEnumAgentStatusFilter<$PrismaModel> | $Enums.AgentStatus
  }

  export type EnumTriggerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TriggerType | EnumTriggerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TriggerType[]
    notIn?: $Enums.TriggerType[]
    not?: NestedEnumTriggerTypeFilter<$PrismaModel> | $Enums.TriggerType
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AgentRunListRelationFilter = {
    every?: AgentRunWhereInput
    some?: AgentRunWhereInput
    none?: AgentRunWhereInput
  }

  export type KnowledgeBaseListRelationFilter = {
    every?: KnowledgeBaseWhereInput
    some?: KnowledgeBaseWhereInput
    none?: KnowledgeBaseWhereInput
  }

  export type AgentMemoryListRelationFilter = {
    every?: AgentMemoryWhereInput
    some?: AgentMemoryWhereInput
    none?: AgentMemoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AgentRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KnowledgeBaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentMemoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AgentCompanyIdNameIsPublicCompoundUniqueInput = {
    companyId: string
    name: string
    isPublic: boolean
  }

  export type AgentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    department?: SortOrder
    definition?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    cronSchedule?: SortOrder
    tools?: SortOrder
    guardrails?: SortOrder
    memoryEnabled?: SortOrder
    knowledgeNeeded?: SortOrder
    isPublic?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    department?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    cronSchedule?: SortOrder
    memoryEnabled?: SortOrder
    knowledgeNeeded?: SortOrder
    isPublic?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    department?: SortOrder
    status?: SortOrder
    trigger?: SortOrder
    cronSchedule?: SortOrder
    memoryEnabled?: SortOrder
    knowledgeNeeded?: SortOrder
    isPublic?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumAgentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[]
    notIn?: $Enums.AgentStatus[]
    not?: NestedEnumAgentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentStatusFilter<$PrismaModel>
  }

  export type EnumTriggerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TriggerType | EnumTriggerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TriggerType[]
    notIn?: $Enums.TriggerType[]
    not?: NestedEnumTriggerTypeWithAggregatesFilter<$PrismaModel> | $Enums.TriggerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTriggerTypeFilter<$PrismaModel>
    _max?: NestedEnumTriggerTypeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RunStatus | EnumRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RunStatus[]
    notIn?: $Enums.RunStatus[]
    not?: NestedEnumRunStatusFilter<$PrismaModel> | $Enums.RunStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AgentScalarRelationFilter = {
    is?: AgentWhereInput
    isNot?: AgentWhereInput
  }

  export type PendingActionNullableScalarRelationFilter = {
    is?: PendingActionWhereInput | null
    isNot?: PendingActionWhereInput | null
  }

  export type AgentRunCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    status?: SortOrder
    logs?: SortOrder
    output?: SortOrder
    triggeredBy?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
  }

  export type AgentRunMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    status?: SortOrder
    output?: SortOrder
    triggeredBy?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
  }

  export type AgentRunMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    status?: SortOrder
    output?: SortOrder
    triggeredBy?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
  }

  export type EnumRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RunStatus | EnumRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RunStatus[]
    notIn?: $Enums.RunStatus[]
    not?: NestedEnumRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.RunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRunStatusFilter<$PrismaModel>
    _max?: NestedEnumRunStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumPendingActionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PendingActionStatus | EnumPendingActionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PendingActionStatus[]
    notIn?: $Enums.PendingActionStatus[]
    not?: NestedEnumPendingActionStatusFilter<$PrismaModel> | $Enums.PendingActionStatus
  }

  export type AgentRunScalarRelationFilter = {
    is?: AgentRunWhereInput
    isNot?: AgentRunWhereInput
  }

  export type PendingActionCountOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendingActionMaxOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PendingActionMinOrderByAggregateInput = {
    id?: SortOrder
    runId?: SortOrder
    action?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumPendingActionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PendingActionStatus | EnumPendingActionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PendingActionStatus[]
    notIn?: $Enums.PendingActionStatus[]
    not?: NestedEnumPendingActionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PendingActionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPendingActionStatusFilter<$PrismaModel>
    _max?: NestedEnumPendingActionStatusFilter<$PrismaModel>
  }

  export type AgentMemoryAgentIdKeyCompoundUniqueInput = {
    agentId: string
    key: string
  }

  export type AgentMemoryCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMemoryMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AgentMemoryMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseCountOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    vectorNamespace?: SortOrder
    createdAt?: SortOrder
  }

  export type KnowledgeBaseMaxOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    vectorNamespace?: SortOrder
    createdAt?: SortOrder
  }

  export type KnowledgeBaseMinOrderByAggregateInput = {
    id?: SortOrder
    agentId?: SortOrder
    fileName?: SortOrder
    fileUrl?: SortOrder
    vectorNamespace?: SortOrder
    createdAt?: SortOrder
  }

  export type SuggestionCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    agentId?: SortOrder
    message?: SortOrder
    dismissed?: SortOrder
    createdAt?: SortOrder
  }

  export type SuggestionMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    agentId?: SortOrder
    message?: SortOrder
    dismissed?: SortOrder
    createdAt?: SortOrder
  }

  export type SuggestionMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    agentId?: SortOrder
    message?: SortOrder
    dismissed?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AgentCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AgentCreateWithoutCompanyInput, AgentUncheckedCreateWithoutCompanyInput> | AgentCreateWithoutCompanyInput[] | AgentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutCompanyInput | AgentCreateOrConnectWithoutCompanyInput[]
    createMany?: AgentCreateManyCompanyInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type AgentUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<AgentCreateWithoutCompanyInput, AgentUncheckedCreateWithoutCompanyInput> | AgentCreateWithoutCompanyInput[] | AgentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutCompanyInput | AgentCreateOrConnectWithoutCompanyInput[]
    createMany?: AgentCreateManyCompanyInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AgentUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AgentCreateWithoutCompanyInput, AgentUncheckedCreateWithoutCompanyInput> | AgentCreateWithoutCompanyInput[] | AgentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutCompanyInput | AgentCreateOrConnectWithoutCompanyInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutCompanyInput | AgentUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AgentCreateManyCompanyInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutCompanyInput | AgentUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutCompanyInput | AgentUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput> | UserCreateWithoutCompanyInput[] | UserUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCreateOrConnectWithoutCompanyInput | UserCreateOrConnectWithoutCompanyInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutCompanyInput | UserUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCreateManyCompanyInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutCompanyInput | UserUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserUpdateManyWithWhereWithoutCompanyInput | UserUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type AgentUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<AgentCreateWithoutCompanyInput, AgentUncheckedCreateWithoutCompanyInput> | AgentCreateWithoutCompanyInput[] | AgentUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutCompanyInput | AgentCreateOrConnectWithoutCompanyInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutCompanyInput | AgentUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: AgentCreateManyCompanyInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutCompanyInput | AgentUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutCompanyInput | AgentUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type AgentCreateNestedManyWithoutUserInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput> | AgentCreateWithoutUserInput[] | AgentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput | AgentCreateOrConnectWithoutUserInput[]
    createMany?: AgentCreateManyUserInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type AgentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput> | AgentCreateWithoutUserInput[] | AgentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput | AgentCreateOrConnectWithoutUserInput[]
    createMany?: AgentCreateManyUserInputEnvelope
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
  }

  export type EnumDepartmentFieldUpdateOperationsInput = {
    set?: $Enums.Department
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type CompanyUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type AgentUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput> | AgentCreateWithoutUserInput[] | AgentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput | AgentCreateOrConnectWithoutUserInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutUserInput | AgentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgentCreateManyUserInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutUserInput | AgentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutUserInput | AgentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type AgentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput> | AgentCreateWithoutUserInput[] | AgentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AgentCreateOrConnectWithoutUserInput | AgentCreateOrConnectWithoutUserInput[]
    upsert?: AgentUpsertWithWhereUniqueWithoutUserInput | AgentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AgentCreateManyUserInputEnvelope
    set?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    disconnect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    delete?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    connect?: AgentWhereUniqueInput | AgentWhereUniqueInput[]
    update?: AgentUpdateWithWhereUniqueWithoutUserInput | AgentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AgentUpdateManyWithWhereWithoutUserInput | AgentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AgentScalarWhereInput | AgentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAgentsInput = {
    create?: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentsInput
    connect?: UserWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutAgentsInput = {
    create?: XOR<CompanyCreateWithoutAgentsInput, CompanyUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutAgentsInput
    connect?: CompanyWhereUniqueInput
  }

  export type AgentRunCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentRunCreateWithoutAgentInput, AgentRunUncheckedCreateWithoutAgentInput> | AgentRunCreateWithoutAgentInput[] | AgentRunUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutAgentInput | AgentRunCreateOrConnectWithoutAgentInput[]
    createMany?: AgentRunCreateManyAgentInputEnvelope
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
  }

  export type KnowledgeBaseCreateNestedManyWithoutAgentInput = {
    create?: XOR<KnowledgeBaseCreateWithoutAgentInput, KnowledgeBaseUncheckedCreateWithoutAgentInput> | KnowledgeBaseCreateWithoutAgentInput[] | KnowledgeBaseUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: KnowledgeBaseCreateOrConnectWithoutAgentInput | KnowledgeBaseCreateOrConnectWithoutAgentInput[]
    createMany?: KnowledgeBaseCreateManyAgentInputEnvelope
    connect?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
  }

  export type AgentMemoryCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentMemoryCreateWithoutAgentInput, AgentMemoryUncheckedCreateWithoutAgentInput> | AgentMemoryCreateWithoutAgentInput[] | AgentMemoryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentMemoryCreateOrConnectWithoutAgentInput | AgentMemoryCreateOrConnectWithoutAgentInput[]
    createMany?: AgentMemoryCreateManyAgentInputEnvelope
    connect?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
  }

  export type AgentRunUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentRunCreateWithoutAgentInput, AgentRunUncheckedCreateWithoutAgentInput> | AgentRunCreateWithoutAgentInput[] | AgentRunUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutAgentInput | AgentRunCreateOrConnectWithoutAgentInput[]
    createMany?: AgentRunCreateManyAgentInputEnvelope
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
  }

  export type KnowledgeBaseUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<KnowledgeBaseCreateWithoutAgentInput, KnowledgeBaseUncheckedCreateWithoutAgentInput> | KnowledgeBaseCreateWithoutAgentInput[] | KnowledgeBaseUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: KnowledgeBaseCreateOrConnectWithoutAgentInput | KnowledgeBaseCreateOrConnectWithoutAgentInput[]
    createMany?: KnowledgeBaseCreateManyAgentInputEnvelope
    connect?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
  }

  export type AgentMemoryUncheckedCreateNestedManyWithoutAgentInput = {
    create?: XOR<AgentMemoryCreateWithoutAgentInput, AgentMemoryUncheckedCreateWithoutAgentInput> | AgentMemoryCreateWithoutAgentInput[] | AgentMemoryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentMemoryCreateOrConnectWithoutAgentInput | AgentMemoryCreateOrConnectWithoutAgentInput[]
    createMany?: AgentMemoryCreateManyAgentInputEnvelope
    connect?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
  }

  export type EnumAgentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AgentStatus
  }

  export type EnumTriggerTypeFieldUpdateOperationsInput = {
    set?: $Enums.TriggerType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutAgentsNestedInput = {
    create?: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAgentsInput
    upsert?: UserUpsertWithoutAgentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAgentsInput, UserUpdateWithoutAgentsInput>, UserUncheckedUpdateWithoutAgentsInput>
  }

  export type CompanyUpdateOneRequiredWithoutAgentsNestedInput = {
    create?: XOR<CompanyCreateWithoutAgentsInput, CompanyUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutAgentsInput
    upsert?: CompanyUpsertWithoutAgentsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutAgentsInput, CompanyUpdateWithoutAgentsInput>, CompanyUncheckedUpdateWithoutAgentsInput>
  }

  export type AgentRunUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentRunCreateWithoutAgentInput, AgentRunUncheckedCreateWithoutAgentInput> | AgentRunCreateWithoutAgentInput[] | AgentRunUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutAgentInput | AgentRunCreateOrConnectWithoutAgentInput[]
    upsert?: AgentRunUpsertWithWhereUniqueWithoutAgentInput | AgentRunUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentRunCreateManyAgentInputEnvelope
    set?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    disconnect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    delete?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    update?: AgentRunUpdateWithWhereUniqueWithoutAgentInput | AgentRunUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentRunUpdateManyWithWhereWithoutAgentInput | AgentRunUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
  }

  export type KnowledgeBaseUpdateManyWithoutAgentNestedInput = {
    create?: XOR<KnowledgeBaseCreateWithoutAgentInput, KnowledgeBaseUncheckedCreateWithoutAgentInput> | KnowledgeBaseCreateWithoutAgentInput[] | KnowledgeBaseUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: KnowledgeBaseCreateOrConnectWithoutAgentInput | KnowledgeBaseCreateOrConnectWithoutAgentInput[]
    upsert?: KnowledgeBaseUpsertWithWhereUniqueWithoutAgentInput | KnowledgeBaseUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: KnowledgeBaseCreateManyAgentInputEnvelope
    set?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
    disconnect?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
    delete?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
    connect?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
    update?: KnowledgeBaseUpdateWithWhereUniqueWithoutAgentInput | KnowledgeBaseUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: KnowledgeBaseUpdateManyWithWhereWithoutAgentInput | KnowledgeBaseUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: KnowledgeBaseScalarWhereInput | KnowledgeBaseScalarWhereInput[]
  }

  export type AgentMemoryUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentMemoryCreateWithoutAgentInput, AgentMemoryUncheckedCreateWithoutAgentInput> | AgentMemoryCreateWithoutAgentInput[] | AgentMemoryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentMemoryCreateOrConnectWithoutAgentInput | AgentMemoryCreateOrConnectWithoutAgentInput[]
    upsert?: AgentMemoryUpsertWithWhereUniqueWithoutAgentInput | AgentMemoryUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentMemoryCreateManyAgentInputEnvelope
    set?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
    disconnect?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
    delete?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
    connect?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
    update?: AgentMemoryUpdateWithWhereUniqueWithoutAgentInput | AgentMemoryUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentMemoryUpdateManyWithWhereWithoutAgentInput | AgentMemoryUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentMemoryScalarWhereInput | AgentMemoryScalarWhereInput[]
  }

  export type AgentRunUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentRunCreateWithoutAgentInput, AgentRunUncheckedCreateWithoutAgentInput> | AgentRunCreateWithoutAgentInput[] | AgentRunUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentRunCreateOrConnectWithoutAgentInput | AgentRunCreateOrConnectWithoutAgentInput[]
    upsert?: AgentRunUpsertWithWhereUniqueWithoutAgentInput | AgentRunUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentRunCreateManyAgentInputEnvelope
    set?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    disconnect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    delete?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    connect?: AgentRunWhereUniqueInput | AgentRunWhereUniqueInput[]
    update?: AgentRunUpdateWithWhereUniqueWithoutAgentInput | AgentRunUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentRunUpdateManyWithWhereWithoutAgentInput | AgentRunUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
  }

  export type KnowledgeBaseUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<KnowledgeBaseCreateWithoutAgentInput, KnowledgeBaseUncheckedCreateWithoutAgentInput> | KnowledgeBaseCreateWithoutAgentInput[] | KnowledgeBaseUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: KnowledgeBaseCreateOrConnectWithoutAgentInput | KnowledgeBaseCreateOrConnectWithoutAgentInput[]
    upsert?: KnowledgeBaseUpsertWithWhereUniqueWithoutAgentInput | KnowledgeBaseUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: KnowledgeBaseCreateManyAgentInputEnvelope
    set?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
    disconnect?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
    delete?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
    connect?: KnowledgeBaseWhereUniqueInput | KnowledgeBaseWhereUniqueInput[]
    update?: KnowledgeBaseUpdateWithWhereUniqueWithoutAgentInput | KnowledgeBaseUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: KnowledgeBaseUpdateManyWithWhereWithoutAgentInput | KnowledgeBaseUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: KnowledgeBaseScalarWhereInput | KnowledgeBaseScalarWhereInput[]
  }

  export type AgentMemoryUncheckedUpdateManyWithoutAgentNestedInput = {
    create?: XOR<AgentMemoryCreateWithoutAgentInput, AgentMemoryUncheckedCreateWithoutAgentInput> | AgentMemoryCreateWithoutAgentInput[] | AgentMemoryUncheckedCreateWithoutAgentInput[]
    connectOrCreate?: AgentMemoryCreateOrConnectWithoutAgentInput | AgentMemoryCreateOrConnectWithoutAgentInput[]
    upsert?: AgentMemoryUpsertWithWhereUniqueWithoutAgentInput | AgentMemoryUpsertWithWhereUniqueWithoutAgentInput[]
    createMany?: AgentMemoryCreateManyAgentInputEnvelope
    set?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
    disconnect?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
    delete?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
    connect?: AgentMemoryWhereUniqueInput | AgentMemoryWhereUniqueInput[]
    update?: AgentMemoryUpdateWithWhereUniqueWithoutAgentInput | AgentMemoryUpdateWithWhereUniqueWithoutAgentInput[]
    updateMany?: AgentMemoryUpdateManyWithWhereWithoutAgentInput | AgentMemoryUpdateManyWithWhereWithoutAgentInput[]
    deleteMany?: AgentMemoryScalarWhereInput | AgentMemoryScalarWhereInput[]
  }

  export type AgentCreateNestedOneWithoutRunsInput = {
    create?: XOR<AgentCreateWithoutRunsInput, AgentUncheckedCreateWithoutRunsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutRunsInput
    connect?: AgentWhereUniqueInput
  }

  export type PendingActionCreateNestedOneWithoutRunInput = {
    create?: XOR<PendingActionCreateWithoutRunInput, PendingActionUncheckedCreateWithoutRunInput>
    connectOrCreate?: PendingActionCreateOrConnectWithoutRunInput
    connect?: PendingActionWhereUniqueInput
  }

  export type PendingActionUncheckedCreateNestedOneWithoutRunInput = {
    create?: XOR<PendingActionCreateWithoutRunInput, PendingActionUncheckedCreateWithoutRunInput>
    connectOrCreate?: PendingActionCreateOrConnectWithoutRunInput
    connect?: PendingActionWhereUniqueInput
  }

  export type EnumRunStatusFieldUpdateOperationsInput = {
    set?: $Enums.RunStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AgentUpdateOneRequiredWithoutRunsNestedInput = {
    create?: XOR<AgentCreateWithoutRunsInput, AgentUncheckedCreateWithoutRunsInput>
    connectOrCreate?: AgentCreateOrConnectWithoutRunsInput
    upsert?: AgentUpsertWithoutRunsInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutRunsInput, AgentUpdateWithoutRunsInput>, AgentUncheckedUpdateWithoutRunsInput>
  }

  export type PendingActionUpdateOneWithoutRunNestedInput = {
    create?: XOR<PendingActionCreateWithoutRunInput, PendingActionUncheckedCreateWithoutRunInput>
    connectOrCreate?: PendingActionCreateOrConnectWithoutRunInput
    upsert?: PendingActionUpsertWithoutRunInput
    disconnect?: PendingActionWhereInput | boolean
    delete?: PendingActionWhereInput | boolean
    connect?: PendingActionWhereUniqueInput
    update?: XOR<XOR<PendingActionUpdateToOneWithWhereWithoutRunInput, PendingActionUpdateWithoutRunInput>, PendingActionUncheckedUpdateWithoutRunInput>
  }

  export type PendingActionUncheckedUpdateOneWithoutRunNestedInput = {
    create?: XOR<PendingActionCreateWithoutRunInput, PendingActionUncheckedCreateWithoutRunInput>
    connectOrCreate?: PendingActionCreateOrConnectWithoutRunInput
    upsert?: PendingActionUpsertWithoutRunInput
    disconnect?: PendingActionWhereInput | boolean
    delete?: PendingActionWhereInput | boolean
    connect?: PendingActionWhereUniqueInput
    update?: XOR<XOR<PendingActionUpdateToOneWithWhereWithoutRunInput, PendingActionUpdateWithoutRunInput>, PendingActionUncheckedUpdateWithoutRunInput>
  }

  export type AgentRunCreateNestedOneWithoutPendingActionInput = {
    create?: XOR<AgentRunCreateWithoutPendingActionInput, AgentRunUncheckedCreateWithoutPendingActionInput>
    connectOrCreate?: AgentRunCreateOrConnectWithoutPendingActionInput
    connect?: AgentRunWhereUniqueInput
  }

  export type EnumPendingActionStatusFieldUpdateOperationsInput = {
    set?: $Enums.PendingActionStatus
  }

  export type AgentRunUpdateOneRequiredWithoutPendingActionNestedInput = {
    create?: XOR<AgentRunCreateWithoutPendingActionInput, AgentRunUncheckedCreateWithoutPendingActionInput>
    connectOrCreate?: AgentRunCreateOrConnectWithoutPendingActionInput
    upsert?: AgentRunUpsertWithoutPendingActionInput
    connect?: AgentRunWhereUniqueInput
    update?: XOR<XOR<AgentRunUpdateToOneWithWhereWithoutPendingActionInput, AgentRunUpdateWithoutPendingActionInput>, AgentRunUncheckedUpdateWithoutPendingActionInput>
  }

  export type AgentCreateNestedOneWithoutMemoryInput = {
    create?: XOR<AgentCreateWithoutMemoryInput, AgentUncheckedCreateWithoutMemoryInput>
    connectOrCreate?: AgentCreateOrConnectWithoutMemoryInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentUpdateOneRequiredWithoutMemoryNestedInput = {
    create?: XOR<AgentCreateWithoutMemoryInput, AgentUncheckedCreateWithoutMemoryInput>
    connectOrCreate?: AgentCreateOrConnectWithoutMemoryInput
    upsert?: AgentUpsertWithoutMemoryInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutMemoryInput, AgentUpdateWithoutMemoryInput>, AgentUncheckedUpdateWithoutMemoryInput>
  }

  export type AgentCreateNestedOneWithoutKnowledgeBasesInput = {
    create?: XOR<AgentCreateWithoutKnowledgeBasesInput, AgentUncheckedCreateWithoutKnowledgeBasesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutKnowledgeBasesInput
    connect?: AgentWhereUniqueInput
  }

  export type AgentUpdateOneRequiredWithoutKnowledgeBasesNestedInput = {
    create?: XOR<AgentCreateWithoutKnowledgeBasesInput, AgentUncheckedCreateWithoutKnowledgeBasesInput>
    connectOrCreate?: AgentCreateOrConnectWithoutKnowledgeBasesInput
    upsert?: AgentUpsertWithoutKnowledgeBasesInput
    connect?: AgentWhereUniqueInput
    update?: XOR<XOR<AgentUpdateToOneWithWhereWithoutKnowledgeBasesInput, AgentUpdateWithoutKnowledgeBasesInput>, AgentUncheckedUpdateWithoutKnowledgeBasesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumDepartmentFilter<$PrismaModel = never> = {
    equals?: $Enums.Department | EnumDepartmentFieldRefInput<$PrismaModel>
    in?: $Enums.Department[]
    notIn?: $Enums.Department[]
    not?: NestedEnumDepartmentFilter<$PrismaModel> | $Enums.Department
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumDepartmentWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Department | EnumDepartmentFieldRefInput<$PrismaModel>
    in?: $Enums.Department[]
    notIn?: $Enums.Department[]
    not?: NestedEnumDepartmentWithAggregatesFilter<$PrismaModel> | $Enums.Department
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDepartmentFilter<$PrismaModel>
    _max?: NestedEnumDepartmentFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumAgentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[]
    notIn?: $Enums.AgentStatus[]
    not?: NestedEnumAgentStatusFilter<$PrismaModel> | $Enums.AgentStatus
  }

  export type NestedEnumTriggerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TriggerType | EnumTriggerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TriggerType[]
    notIn?: $Enums.TriggerType[]
    not?: NestedEnumTriggerTypeFilter<$PrismaModel> | $Enums.TriggerType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAgentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AgentStatus | EnumAgentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AgentStatus[]
    notIn?: $Enums.AgentStatus[]
    not?: NestedEnumAgentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AgentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAgentStatusFilter<$PrismaModel>
    _max?: NestedEnumAgentStatusFilter<$PrismaModel>
  }

  export type NestedEnumTriggerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TriggerType | EnumTriggerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TriggerType[]
    notIn?: $Enums.TriggerType[]
    not?: NestedEnumTriggerTypeWithAggregatesFilter<$PrismaModel> | $Enums.TriggerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTriggerTypeFilter<$PrismaModel>
    _max?: NestedEnumTriggerTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RunStatus | EnumRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RunStatus[]
    notIn?: $Enums.RunStatus[]
    not?: NestedEnumRunStatusFilter<$PrismaModel> | $Enums.RunStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RunStatus | EnumRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RunStatus[]
    notIn?: $Enums.RunStatus[]
    not?: NestedEnumRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.RunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRunStatusFilter<$PrismaModel>
    _max?: NestedEnumRunStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPendingActionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PendingActionStatus | EnumPendingActionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PendingActionStatus[]
    notIn?: $Enums.PendingActionStatus[]
    not?: NestedEnumPendingActionStatusFilter<$PrismaModel> | $Enums.PendingActionStatus
  }

  export type NestedEnumPendingActionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PendingActionStatus | EnumPendingActionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PendingActionStatus[]
    notIn?: $Enums.PendingActionStatus[]
    not?: NestedEnumPendingActionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PendingActionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPendingActionStatusFilter<$PrismaModel>
    _max?: NestedEnumPendingActionStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutCompanyInput = {
    id?: string
    email: string
    password: string
    name: string
    department: $Enums.Department
    role?: $Enums.Role
    createdAt?: Date | string
    agents?: AgentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCompanyInput = {
    id?: string
    email: string
    password: string
    name: string
    department: $Enums.Department
    role?: $Enums.Role
    createdAt?: Date | string
    agents?: AgentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCompanyInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserCreateManyCompanyInputEnvelope = {
    data: UserCreateManyCompanyInput | UserCreateManyCompanyInput[]
  }

  export type AgentCreateWithoutCompanyInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAgentsInput
    runs?: AgentRunCreateNestedManyWithoutAgentInput
    knowledgeBases?: KnowledgeBaseCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutCompanyInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: AgentRunUncheckedCreateNestedManyWithoutAgentInput
    knowledgeBases?: KnowledgeBaseUncheckedCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutCompanyInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutCompanyInput, AgentUncheckedCreateWithoutCompanyInput>
  }

  export type AgentCreateManyCompanyInputEnvelope = {
    data: AgentCreateManyCompanyInput | AgentCreateManyCompanyInput[]
  }

  export type UserUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCreateWithoutCompanyInput, UserUncheckedCreateWithoutCompanyInput>
  }

  export type UserUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutCompanyInput, UserUncheckedUpdateWithoutCompanyInput>
  }

  export type UserUpdateManyWithWhereWithoutCompanyInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutCompanyInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    department?: EnumDepartmentFilter<"User"> | $Enums.Department
    role?: EnumRoleFilter<"User"> | $Enums.Role
    companyId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type AgentUpsertWithWhereUniqueWithoutCompanyInput = {
    where: AgentWhereUniqueInput
    update: XOR<AgentUpdateWithoutCompanyInput, AgentUncheckedUpdateWithoutCompanyInput>
    create: XOR<AgentCreateWithoutCompanyInput, AgentUncheckedCreateWithoutCompanyInput>
  }

  export type AgentUpdateWithWhereUniqueWithoutCompanyInput = {
    where: AgentWhereUniqueInput
    data: XOR<AgentUpdateWithoutCompanyInput, AgentUncheckedUpdateWithoutCompanyInput>
  }

  export type AgentUpdateManyWithWhereWithoutCompanyInput = {
    where: AgentScalarWhereInput
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyWithoutCompanyInput>
  }

  export type AgentScalarWhereInput = {
    AND?: AgentScalarWhereInput | AgentScalarWhereInput[]
    OR?: AgentScalarWhereInput[]
    NOT?: AgentScalarWhereInput | AgentScalarWhereInput[]
    id?: StringFilter<"Agent"> | string
    name?: StringFilter<"Agent"> | string
    description?: StringFilter<"Agent"> | string
    department?: EnumDepartmentFilter<"Agent"> | $Enums.Department
    definition?: JsonFilter<"Agent">
    status?: EnumAgentStatusFilter<"Agent"> | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFilter<"Agent"> | $Enums.TriggerType
    cronSchedule?: StringNullableFilter<"Agent"> | string | null
    tools?: JsonFilter<"Agent">
    guardrails?: JsonFilter<"Agent">
    memoryEnabled?: BoolFilter<"Agent"> | boolean
    knowledgeNeeded?: BoolFilter<"Agent"> | boolean
    isPublic?: BoolFilter<"Agent"> | boolean
    userId?: StringFilter<"Agent"> | string
    companyId?: StringFilter<"Agent"> | string
    createdAt?: DateTimeFilter<"Agent"> | Date | string
    updatedAt?: DateTimeFilter<"Agent"> | Date | string
  }

  export type CompanyCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    agents?: AgentCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    agents?: AgentUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type AgentCreateWithoutUserInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutAgentsInput
    runs?: AgentRunCreateNestedManyWithoutAgentInput
    knowledgeBases?: KnowledgeBaseCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: AgentRunUncheckedCreateNestedManyWithoutAgentInput
    knowledgeBases?: KnowledgeBaseUncheckedCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutUserInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
  }

  export type AgentCreateManyUserInputEnvelope = {
    data: AgentCreateManyUserInput | AgentCreateManyUserInput[]
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type AgentUpsertWithWhereUniqueWithoutUserInput = {
    where: AgentWhereUniqueInput
    update: XOR<AgentUpdateWithoutUserInput, AgentUncheckedUpdateWithoutUserInput>
    create: XOR<AgentCreateWithoutUserInput, AgentUncheckedCreateWithoutUserInput>
  }

  export type AgentUpdateWithWhereUniqueWithoutUserInput = {
    where: AgentWhereUniqueInput
    data: XOR<AgentUpdateWithoutUserInput, AgentUncheckedUpdateWithoutUserInput>
  }

  export type AgentUpdateManyWithWhereWithoutUserInput = {
    where: AgentScalarWhereInput
    data: XOR<AgentUpdateManyMutationInput, AgentUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCreateWithoutAgentsInput = {
    id?: string
    email: string
    password: string
    name: string
    department: $Enums.Department
    role?: $Enums.Role
    createdAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutAgentsInput = {
    id?: string
    email: string
    password: string
    name: string
    department: $Enums.Department
    role?: $Enums.Role
    companyId: string
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutAgentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
  }

  export type CompanyCreateWithoutAgentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutAgentsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutAgentsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutAgentsInput, CompanyUncheckedCreateWithoutAgentsInput>
  }

  export type AgentRunCreateWithoutAgentInput = {
    id?: string
    status: $Enums.RunStatus
    logs: JsonNullValueInput | InputJsonValue
    output?: string | null
    triggeredBy: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    pendingAction?: PendingActionCreateNestedOneWithoutRunInput
  }

  export type AgentRunUncheckedCreateWithoutAgentInput = {
    id?: string
    status: $Enums.RunStatus
    logs: JsonNullValueInput | InputJsonValue
    output?: string | null
    triggeredBy: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    pendingAction?: PendingActionUncheckedCreateNestedOneWithoutRunInput
  }

  export type AgentRunCreateOrConnectWithoutAgentInput = {
    where: AgentRunWhereUniqueInput
    create: XOR<AgentRunCreateWithoutAgentInput, AgentRunUncheckedCreateWithoutAgentInput>
  }

  export type AgentRunCreateManyAgentInputEnvelope = {
    data: AgentRunCreateManyAgentInput | AgentRunCreateManyAgentInput[]
  }

  export type KnowledgeBaseCreateWithoutAgentInput = {
    id?: string
    fileName: string
    fileUrl: string
    vectorNamespace: string
    createdAt?: Date | string
  }

  export type KnowledgeBaseUncheckedCreateWithoutAgentInput = {
    id?: string
    fileName: string
    fileUrl: string
    vectorNamespace: string
    createdAt?: Date | string
  }

  export type KnowledgeBaseCreateOrConnectWithoutAgentInput = {
    where: KnowledgeBaseWhereUniqueInput
    create: XOR<KnowledgeBaseCreateWithoutAgentInput, KnowledgeBaseUncheckedCreateWithoutAgentInput>
  }

  export type KnowledgeBaseCreateManyAgentInputEnvelope = {
    data: KnowledgeBaseCreateManyAgentInput | KnowledgeBaseCreateManyAgentInput[]
  }

  export type AgentMemoryCreateWithoutAgentInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AgentMemoryUncheckedCreateWithoutAgentInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AgentMemoryCreateOrConnectWithoutAgentInput = {
    where: AgentMemoryWhereUniqueInput
    create: XOR<AgentMemoryCreateWithoutAgentInput, AgentMemoryUncheckedCreateWithoutAgentInput>
  }

  export type AgentMemoryCreateManyAgentInputEnvelope = {
    data: AgentMemoryCreateManyAgentInput | AgentMemoryCreateManyAgentInput[]
  }

  export type UserUpsertWithoutAgentsInput = {
    update: XOR<UserUpdateWithoutAgentsInput, UserUncheckedUpdateWithoutAgentsInput>
    create: XOR<UserCreateWithoutAgentsInput, UserUncheckedCreateWithoutAgentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAgentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAgentsInput, UserUncheckedUpdateWithoutAgentsInput>
  }

  export type UserUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUpsertWithoutAgentsInput = {
    update: XOR<CompanyUpdateWithoutAgentsInput, CompanyUncheckedUpdateWithoutAgentsInput>
    create: XOR<CompanyCreateWithoutAgentsInput, CompanyUncheckedCreateWithoutAgentsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutAgentsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutAgentsInput, CompanyUncheckedUpdateWithoutAgentsInput>
  }

  export type CompanyUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutAgentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type AgentRunUpsertWithWhereUniqueWithoutAgentInput = {
    where: AgentRunWhereUniqueInput
    update: XOR<AgentRunUpdateWithoutAgentInput, AgentRunUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentRunCreateWithoutAgentInput, AgentRunUncheckedCreateWithoutAgentInput>
  }

  export type AgentRunUpdateWithWhereUniqueWithoutAgentInput = {
    where: AgentRunWhereUniqueInput
    data: XOR<AgentRunUpdateWithoutAgentInput, AgentRunUncheckedUpdateWithoutAgentInput>
  }

  export type AgentRunUpdateManyWithWhereWithoutAgentInput = {
    where: AgentRunScalarWhereInput
    data: XOR<AgentRunUpdateManyMutationInput, AgentRunUncheckedUpdateManyWithoutAgentInput>
  }

  export type AgentRunScalarWhereInput = {
    AND?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
    OR?: AgentRunScalarWhereInput[]
    NOT?: AgentRunScalarWhereInput | AgentRunScalarWhereInput[]
    id?: StringFilter<"AgentRun"> | string
    agentId?: StringFilter<"AgentRun"> | string
    status?: EnumRunStatusFilter<"AgentRun"> | $Enums.RunStatus
    logs?: JsonFilter<"AgentRun">
    output?: StringNullableFilter<"AgentRun"> | string | null
    triggeredBy?: StringFilter<"AgentRun"> | string
    startedAt?: DateTimeFilter<"AgentRun"> | Date | string
    endedAt?: DateTimeNullableFilter<"AgentRun"> | Date | string | null
  }

  export type KnowledgeBaseUpsertWithWhereUniqueWithoutAgentInput = {
    where: KnowledgeBaseWhereUniqueInput
    update: XOR<KnowledgeBaseUpdateWithoutAgentInput, KnowledgeBaseUncheckedUpdateWithoutAgentInput>
    create: XOR<KnowledgeBaseCreateWithoutAgentInput, KnowledgeBaseUncheckedCreateWithoutAgentInput>
  }

  export type KnowledgeBaseUpdateWithWhereUniqueWithoutAgentInput = {
    where: KnowledgeBaseWhereUniqueInput
    data: XOR<KnowledgeBaseUpdateWithoutAgentInput, KnowledgeBaseUncheckedUpdateWithoutAgentInput>
  }

  export type KnowledgeBaseUpdateManyWithWhereWithoutAgentInput = {
    where: KnowledgeBaseScalarWhereInput
    data: XOR<KnowledgeBaseUpdateManyMutationInput, KnowledgeBaseUncheckedUpdateManyWithoutAgentInput>
  }

  export type KnowledgeBaseScalarWhereInput = {
    AND?: KnowledgeBaseScalarWhereInput | KnowledgeBaseScalarWhereInput[]
    OR?: KnowledgeBaseScalarWhereInput[]
    NOT?: KnowledgeBaseScalarWhereInput | KnowledgeBaseScalarWhereInput[]
    id?: StringFilter<"KnowledgeBase"> | string
    agentId?: StringFilter<"KnowledgeBase"> | string
    fileName?: StringFilter<"KnowledgeBase"> | string
    fileUrl?: StringFilter<"KnowledgeBase"> | string
    vectorNamespace?: StringFilter<"KnowledgeBase"> | string
    createdAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
  }

  export type AgentMemoryUpsertWithWhereUniqueWithoutAgentInput = {
    where: AgentMemoryWhereUniqueInput
    update: XOR<AgentMemoryUpdateWithoutAgentInput, AgentMemoryUncheckedUpdateWithoutAgentInput>
    create: XOR<AgentMemoryCreateWithoutAgentInput, AgentMemoryUncheckedCreateWithoutAgentInput>
  }

  export type AgentMemoryUpdateWithWhereUniqueWithoutAgentInput = {
    where: AgentMemoryWhereUniqueInput
    data: XOR<AgentMemoryUpdateWithoutAgentInput, AgentMemoryUncheckedUpdateWithoutAgentInput>
  }

  export type AgentMemoryUpdateManyWithWhereWithoutAgentInput = {
    where: AgentMemoryScalarWhereInput
    data: XOR<AgentMemoryUpdateManyMutationInput, AgentMemoryUncheckedUpdateManyWithoutAgentInput>
  }

  export type AgentMemoryScalarWhereInput = {
    AND?: AgentMemoryScalarWhereInput | AgentMemoryScalarWhereInput[]
    OR?: AgentMemoryScalarWhereInput[]
    NOT?: AgentMemoryScalarWhereInput | AgentMemoryScalarWhereInput[]
    id?: StringFilter<"AgentMemory"> | string
    agentId?: StringFilter<"AgentMemory"> | string
    key?: StringFilter<"AgentMemory"> | string
    value?: StringFilter<"AgentMemory"> | string
    updatedAt?: DateTimeFilter<"AgentMemory"> | Date | string
  }

  export type AgentCreateWithoutRunsInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAgentsInput
    company: CompanyCreateNestedOneWithoutAgentsInput
    knowledgeBases?: KnowledgeBaseCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutRunsInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId: string
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    knowledgeBases?: KnowledgeBaseUncheckedCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutRunsInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutRunsInput, AgentUncheckedCreateWithoutRunsInput>
  }

  export type PendingActionCreateWithoutRunInput = {
    id?: string
    action: string
    status?: $Enums.PendingActionStatus
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendingActionUncheckedCreateWithoutRunInput = {
    id?: string
    action: string
    status?: $Enums.PendingActionStatus
    message: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PendingActionCreateOrConnectWithoutRunInput = {
    where: PendingActionWhereUniqueInput
    create: XOR<PendingActionCreateWithoutRunInput, PendingActionUncheckedCreateWithoutRunInput>
  }

  export type AgentUpsertWithoutRunsInput = {
    update: XOR<AgentUpdateWithoutRunsInput, AgentUncheckedUpdateWithoutRunsInput>
    create: XOR<AgentCreateWithoutRunsInput, AgentUncheckedCreateWithoutRunsInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutRunsInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutRunsInput, AgentUncheckedUpdateWithoutRunsInput>
  }

  export type AgentUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentsNestedInput
    company?: CompanyUpdateOneRequiredWithoutAgentsNestedInput
    knowledgeBases?: KnowledgeBaseUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    knowledgeBases?: KnowledgeBaseUncheckedUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type PendingActionUpsertWithoutRunInput = {
    update: XOR<PendingActionUpdateWithoutRunInput, PendingActionUncheckedUpdateWithoutRunInput>
    create: XOR<PendingActionCreateWithoutRunInput, PendingActionUncheckedCreateWithoutRunInput>
    where?: PendingActionWhereInput
  }

  export type PendingActionUpdateToOneWithWhereWithoutRunInput = {
    where?: PendingActionWhereInput
    data: XOR<PendingActionUpdateWithoutRunInput, PendingActionUncheckedUpdateWithoutRunInput>
  }

  export type PendingActionUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPendingActionStatusFieldUpdateOperationsInput | $Enums.PendingActionStatus
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingActionUncheckedUpdateWithoutRunInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    status?: EnumPendingActionStatusFieldUpdateOperationsInput | $Enums.PendingActionStatus
    message?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunCreateWithoutPendingActionInput = {
    id?: string
    status: $Enums.RunStatus
    logs: JsonNullValueInput | InputJsonValue
    output?: string | null
    triggeredBy: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    agent: AgentCreateNestedOneWithoutRunsInput
  }

  export type AgentRunUncheckedCreateWithoutPendingActionInput = {
    id?: string
    agentId: string
    status: $Enums.RunStatus
    logs: JsonNullValueInput | InputJsonValue
    output?: string | null
    triggeredBy: string
    startedAt?: Date | string
    endedAt?: Date | string | null
  }

  export type AgentRunCreateOrConnectWithoutPendingActionInput = {
    where: AgentRunWhereUniqueInput
    create: XOR<AgentRunCreateWithoutPendingActionInput, AgentRunUncheckedCreateWithoutPendingActionInput>
  }

  export type AgentRunUpsertWithoutPendingActionInput = {
    update: XOR<AgentRunUpdateWithoutPendingActionInput, AgentRunUncheckedUpdateWithoutPendingActionInput>
    create: XOR<AgentRunCreateWithoutPendingActionInput, AgentRunUncheckedCreateWithoutPendingActionInput>
    where?: AgentRunWhereInput
  }

  export type AgentRunUpdateToOneWithWhereWithoutPendingActionInput = {
    where?: AgentRunWhereInput
    data: XOR<AgentRunUpdateWithoutPendingActionInput, AgentRunUncheckedUpdateWithoutPendingActionInput>
  }

  export type AgentRunUpdateWithoutPendingActionInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    logs?: JsonNullValueInput | InputJsonValue
    output?: NullableStringFieldUpdateOperationsInput | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agent?: AgentUpdateOneRequiredWithoutRunsNestedInput
  }

  export type AgentRunUncheckedUpdateWithoutPendingActionInput = {
    id?: StringFieldUpdateOperationsInput | string
    agentId?: StringFieldUpdateOperationsInput | string
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    logs?: JsonNullValueInput | InputJsonValue
    output?: NullableStringFieldUpdateOperationsInput | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AgentCreateWithoutMemoryInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAgentsInput
    company: CompanyCreateNestedOneWithoutAgentsInput
    runs?: AgentRunCreateNestedManyWithoutAgentInput
    knowledgeBases?: KnowledgeBaseCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutMemoryInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId: string
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: AgentRunUncheckedCreateNestedManyWithoutAgentInput
    knowledgeBases?: KnowledgeBaseUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutMemoryInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutMemoryInput, AgentUncheckedCreateWithoutMemoryInput>
  }

  export type AgentUpsertWithoutMemoryInput = {
    update: XOR<AgentUpdateWithoutMemoryInput, AgentUncheckedUpdateWithoutMemoryInput>
    create: XOR<AgentCreateWithoutMemoryInput, AgentUncheckedCreateWithoutMemoryInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutMemoryInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutMemoryInput, AgentUncheckedUpdateWithoutMemoryInput>
  }

  export type AgentUpdateWithoutMemoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentsNestedInput
    company?: CompanyUpdateOneRequiredWithoutAgentsNestedInput
    runs?: AgentRunUpdateManyWithoutAgentNestedInput
    knowledgeBases?: KnowledgeBaseUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutMemoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: AgentRunUncheckedUpdateManyWithoutAgentNestedInput
    knowledgeBases?: KnowledgeBaseUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentCreateWithoutKnowledgeBasesInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAgentsInput
    company: CompanyCreateNestedOneWithoutAgentsInput
    runs?: AgentRunCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryCreateNestedManyWithoutAgentInput
  }

  export type AgentUncheckedCreateWithoutKnowledgeBasesInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId: string
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    runs?: AgentRunUncheckedCreateNestedManyWithoutAgentInput
    memory?: AgentMemoryUncheckedCreateNestedManyWithoutAgentInput
  }

  export type AgentCreateOrConnectWithoutKnowledgeBasesInput = {
    where: AgentWhereUniqueInput
    create: XOR<AgentCreateWithoutKnowledgeBasesInput, AgentUncheckedCreateWithoutKnowledgeBasesInput>
  }

  export type AgentUpsertWithoutKnowledgeBasesInput = {
    update: XOR<AgentUpdateWithoutKnowledgeBasesInput, AgentUncheckedUpdateWithoutKnowledgeBasesInput>
    create: XOR<AgentCreateWithoutKnowledgeBasesInput, AgentUncheckedCreateWithoutKnowledgeBasesInput>
    where?: AgentWhereInput
  }

  export type AgentUpdateToOneWithWhereWithoutKnowledgeBasesInput = {
    where?: AgentWhereInput
    data: XOR<AgentUpdateWithoutKnowledgeBasesInput, AgentUncheckedUpdateWithoutKnowledgeBasesInput>
  }

  export type AgentUpdateWithoutKnowledgeBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentsNestedInput
    company?: CompanyUpdateOneRequiredWithoutAgentsNestedInput
    runs?: AgentRunUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutKnowledgeBasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: AgentRunUncheckedUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type UserCreateManyCompanyInput = {
    id?: string
    email: string
    password: string
    name: string
    department: $Enums.Department
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type AgentCreateManyCompanyInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    agents?: AgentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAgentsNestedInput
    runs?: AgentRunUpdateManyWithoutAgentNestedInput
    knowledgeBases?: KnowledgeBaseUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: AgentRunUncheckedUpdateManyWithoutAgentNestedInput
    knowledgeBases?: KnowledgeBaseUncheckedUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentCreateManyUserInput = {
    id?: string
    name: string
    description: string
    department: $Enums.Department
    definition: JsonNullValueInput | InputJsonValue
    status?: $Enums.AgentStatus
    trigger: $Enums.TriggerType
    cronSchedule?: string | null
    tools: JsonNullValueInput | InputJsonValue
    guardrails: JsonNullValueInput | InputJsonValue
    memoryEnabled?: boolean
    knowledgeNeeded?: boolean
    isPublic?: boolean
    companyId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AgentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutAgentsNestedInput
    runs?: AgentRunUpdateManyWithoutAgentNestedInput
    knowledgeBases?: KnowledgeBaseUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    runs?: AgentRunUncheckedUpdateManyWithoutAgentNestedInput
    knowledgeBases?: KnowledgeBaseUncheckedUpdateManyWithoutAgentNestedInput
    memory?: AgentMemoryUncheckedUpdateManyWithoutAgentNestedInput
  }

  export type AgentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    department?: EnumDepartmentFieldUpdateOperationsInput | $Enums.Department
    definition?: JsonNullValueInput | InputJsonValue
    status?: EnumAgentStatusFieldUpdateOperationsInput | $Enums.AgentStatus
    trigger?: EnumTriggerTypeFieldUpdateOperationsInput | $Enums.TriggerType
    cronSchedule?: NullableStringFieldUpdateOperationsInput | string | null
    tools?: JsonNullValueInput | InputJsonValue
    guardrails?: JsonNullValueInput | InputJsonValue
    memoryEnabled?: BoolFieldUpdateOperationsInput | boolean
    knowledgeNeeded?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    companyId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentRunCreateManyAgentInput = {
    id?: string
    status: $Enums.RunStatus
    logs: JsonNullValueInput | InputJsonValue
    output?: string | null
    triggeredBy: string
    startedAt?: Date | string
    endedAt?: Date | string | null
  }

  export type KnowledgeBaseCreateManyAgentInput = {
    id?: string
    fileName: string
    fileUrl: string
    vectorNamespace: string
    createdAt?: Date | string
  }

  export type AgentMemoryCreateManyAgentInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AgentRunUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    logs?: JsonNullValueInput | InputJsonValue
    output?: NullableStringFieldUpdateOperationsInput | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pendingAction?: PendingActionUpdateOneWithoutRunNestedInput
  }

  export type AgentRunUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    logs?: JsonNullValueInput | InputJsonValue
    output?: NullableStringFieldUpdateOperationsInput | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pendingAction?: PendingActionUncheckedUpdateOneWithoutRunNestedInput
  }

  export type AgentRunUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    logs?: JsonNullValueInput | InputJsonValue
    output?: NullableStringFieldUpdateOperationsInput | string | null
    triggeredBy?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type KnowledgeBaseUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    vectorNamespace?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    vectorNamespace?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    vectorNamespace?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMemoryUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMemoryUncheckedUpdateWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AgentMemoryUncheckedUpdateManyWithoutAgentInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}