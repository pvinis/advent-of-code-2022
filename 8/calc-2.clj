(defn parse [xs]
  (map #(Integer/parseInt %) xs))

(let [input (slurp "input-1.txt")]
  (as-> input v
    (str/split v #"\n\n") ;; split into groups
    (map #(str/split % #"\n") v) ;; split into lines
    ;; (first v)
    (map parse v) ;; string to int
    (map #(reduce + %) v) ;; sum up
    (sort v)
    (reverse v)
    (take 3 v)
    (reduce + v)
    (println v)))
