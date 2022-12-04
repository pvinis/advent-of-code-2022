(defn parse [xs]
  (map #(Integer/parseInt %) xs))

(defn fully-contained [r1 r2]
  (println "r1: " r1)
  (and (<= (Integer/parseInt (first r1)) (Integer/parseInt (first r2)))
       (<= (Integer/parseInt (second r1)) (Integer/parseInt (second r2)))))

(println (fully-contained [2 4] [1 3]))

(let [input (slurp "input-test.txt")]
  (as-> input v
    (str/split v #"\n") ;; split into lines
    (map (fn [a] (str/split a #",")) v) ;; split into pairs
    (map (fn [b] (map (fn [a] (str/split a #"-")) b)) v) ;; split into ranges
    (map (fn [a] (map #(fully-contained
                        (first %)
                        (second %)) a)) v)
    (println v)))

